// >$ npm install request --save 
var request = require("request");
var dal = require('./storage.js');

// http://stackoverflow.com/questions/10888610/ignore-invalid-self-signed-ssl-certificate-in-node-js-with-https-request
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


var BASE_URL = "https://web-ims.thomasmore.be/datadistribution/API/2.0";
var Settings = function (url) {
    this.url = BASE_URL + url;
    this.method = "GET";
    this.qs = {format: 'json'};
    this.headers = {
        authorization: "Basic aW1zOno1MTJtVDRKeVgwUExXZw=="
    };
};

var Drone = function (id, name, mac, location) {
    this._id = id
    this.name = name;
    this.mac = mac;
    this.location = location;
};

var File = function (id, date_first_record, date_last_record, date_loaded, contents_count ) {
    this._id = id;
    this.date_first_record = date_first_record;
    this.date_last_record = date_last_record;
    this.date_loaded = date_loaded;
    this.contents_count = contents_count;
};

var Content = function (id, mac_address, datetime, rssi, ref, url) {
    this._id = id;
    this.mac_address = mac_address;
    this.datetime = datetime;
    this.rssi = rssi;
    this.ref = ref;
    this.url = url
   
};

var dronesSettings = new Settings("/drones?format=json");


dal.clearDrone();
dal.clearFiledeets();
dal.clearContent();

request(dronesSettings, function (error, response, dronesString) {
    var drones = JSON.parse(dronesString);
    //console.log(drones);
    console.log("***************************************************************************");
    drones.forEach(function (drone) {
        var droneSettings = new Settings("/drones/" + drone.id + "?format=json");
        request(droneSettings, function (error, response, droneString) {
            var drone = JSON.parse(droneString);
            dal.insertDrone(new Drone(drone.id, drone.name, drone.mac_address, drone.location));
            
            var dronelocsettings = new Settings("/files?drone_id.is=" + drone.id + "&format=json");
            request(dronelocsettings, function (error, response, dronelocString) {
               
                var droneloc = JSON.parse(dronelocString);

                droneloc.forEach(function (filedetails) {
                    var filedetailsSettings = new Settings('/files/' + filedetails.id + "?format=json");
                    request(filedetailsSettings, function (error, response, filedetailsstring) {
                         try{ 
                        var filedeets = JSON.parse(filedetailsstring);
                        dal.insertFiledeets(new File(
                                filedeets.id, 
                                filedeets.date_first_record, 
                                filedeets.date_last_record, 
                                filedeets.date_loaded, 
                                filedeets.contents_count));
                    
                        var contents = new Settings('/files/' + filedetails.id + '/contents?format=json');
                        request(contents, function(error, respons, contentstring){
                            var content = JSON.parse(contentstring);
                            
                            content.forEach(function(content){
                                var contentdetailsettings = new Settings('/files/' + filedetails.id + "/contents/" + content.id + '?format=json');
                                request(contentdetailsettings, function(error, response, contentdetailstring){
                                   try{
                                       var contentdeets = Json.parse(contentdetailstring);
                                       dal.insertContent(contentdeets.id,
                                                        contentdeets.mac_address,
                                                        contentdeets.datetime,
                                                        contentdeets.rssi,
                                                        contentdeets.url,
                                                        contentdeets.ref,
                                                        drone.id,
                                                        drone.name,
                                                        drone.location
                                                        );
                                   }catch (e){console.log(e);} 
                                });
                            });
                          
                        });
                        
                        
                        }catch (e){
                                console.log(e);
                            }
                          
                        });
                    
                }); 
                
                
            });
        });


    });
});

console.log("Hello World!");