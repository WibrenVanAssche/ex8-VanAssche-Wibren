

begin code door Luc Steffens.
rest zelf gescreven met hulp van de code van Jonas Cristens en Jeroen Van de Bergh



******************************************************************************************
[SyntaxError: Unexpected token u]

na insert van try catch om 'unecpected token u' tegente gaan blijkt dat dit wel degelijk het probleem was waardoor ik er niet meer kon binnenhalen

enorme vertragingen hierdoor wel

krijg nu wel een heleboel syntaxerrors



*******************************************************************

na toevoegen contents nog steeds parsing error....  ==> Json ipv JSON geschreven

******************************************************

C:\Users\wibren\node_modules\mongodb\lib\mongo_client.js:236
          throw err
          ^

TypeError: Cannot assign to read only property '_id' of 3bf27f5adab9cce3379833355261f19e889ec34d
    at Collection.insertMany (C:\Users\wibren\node_modules\mongodb\lib\collection.js:512:43)
    at Collection.insert (C:\Users\wibren\node_modules\mongodb\lib\collection.js:824:15)
    at C:\Users\wibren\Documents\NetBeansProjects\ProberRequestNodeJs\storage.js:60:39
    at C:\Users\wibren\Documents\NetBeansProjects\ProberRequestNodeJs\storage.js:14:13
    at connectCallback (C:\Users\wibren\node_modules\mongodb\lib\mongo_client.js:314:5)
    at C:\Users\wibren\node_modules\mongodb\lib\mongo_client.js:233:11
    at nextTickCallbackWith0Args (node.js:420:9)


nu krijg ik deze ==> dal verkeerd geschreven

******************************************************************************

ik probeerde om enkel de contents dal uit te voeren => laad enkel de eerste content binnen (slechts 8 files) hoeveelheid klopt met link die er naar toe ging.

drone data in te laden in contents lijkt ook niet te werken.

*****************************************************************************
laden van files lijkt te lukken maar er worden wel enorm veel 'unexpected token U' opgevangen.

blijft uiteindelijk ook hangen op een hele reeks van deze errors.

in totaal meer errors dan geslaagde connecties.

****************************************************************************

