PennController.ResetPrefix(null);
PennController.AddHost("https://amor.cms.hu-berlin.de/~idlsfbnd/zeitungsstudie/");
PennController.DebugOff();
var progressBarText = "Fortschritt";  
Sequence("Info","Consent","Code","Anleitung","Counter","Trial","Meta1","Meta2","send","Final");
SetCounter("Counter","inc",1);

//New Consent
//Mit Boxen zum Anklicken und Dateien zum herunterladen; angelehnt an C04

newTrial("Consent",
 newImage("HU","HU Logo.png")
        .size(289,65)
    ,

    newImage("SFB","SFB Logo.png")
        .size(280,86)
    ,
    newCanvas("Logosnebeneinander",1138,100)
        .add(100,0, getImage("HU"))
        .add(750,0, getImage("SFB"))
        .center()
        .print()
    ,
    newHtml("Consent", "consent.html")
        .center()
        .settings.css("font-size", "large")
        .print()
,
    newButton("Weiter","Weiter")
    .print()
    .log()
    .wait(
        getHtml("Consent").test.complete()
            .failure(getHtml("Consent").warn())
    )
)
,
//WILLKOMMENSSEITE & INFOBLATT
newTrial("Info",
    newImage("HU","HU Logo.png")
        .size(289,65)
    ,

    newImage("SFB","SFB Logo.png")
        .size(280,86)
    ,
    newCanvas("Logosnebeneinander",1138,100)
        .add(100,0, getImage("HU"))
        .add(750,0, getImage("SFB"))
        .center()
        .print()
    ,
    newHtml("willkommen", "information.html")
        .center()
        .settings.css("font-size", "large")
        .print()
    ,

    newButton("Weiter_Alter","Ich bin unter 18.")
        .center()
        .print()
    ,
    newText("Leerzeile"," <br></p>")
        .print()
    ,
    getButton("Weiter_Alter")
        .wait()
)
    ,

//CODE-EINGABE
newTrial("Code",
    newImage("HU","HU Logo.png")
        .size(289,65)
    ,
        newImage("SFB","SFB Logo.png")
        .size(280,86)
    ,
    newCanvas("Logosnebeneinander",1138,100)
        .add(100,0, getImage("HU"))
        .add(750,0, getImage("SFB"))
        .center()
        .print()
    ,

    newHtml("Code", "code.html")
        .center()
        .settings.css("font-size", "large")
        .print()
    ,
    newCanvas("Code-Textfeld", 1, 10)
        .center()
        .print()
,
    newTextInput("Texteingabe-Code")
        .center()
        .print()
,
    newText("Leerzeile"," <br></p>")
        .center()
        .print()
,
    getTextInput("Texteingabe-Code")
            .log("final")
,
//    newText("Danke","Vielen Dank! Als n??chstes folgt eine Einwilligungserkl??rung. Klicken Sie bitte auf den Button.<b></p>")
//        .center()
//        .print()
//,
    newButton("weiter","zur Anleitung")
        .center()
        .print()
        .wait(
            getTextInput("Texteingabe-Code").test.text( /[a-zA-Z]+[0-9]+[a-zA-Z]+/i)
                    .failure( newText('errorcode', "<br>Bitte gib den Code ein.").color("red") .center().print() )
            )
,
    newText("Leerzeile"," <br></p>")
        .center()
        .print()
)
,

//Anleitung
newTrial("Anleitung",
newHtml("Anleitung","anleitung.html")
    .settings.css("font-size", "large")
    .center()
    .print()
,
newImage("Erkl??rbild","Erkl??rbild.png")
    .size(800,370)
    .print()
,

newText("Test", "<font color=#DF0101> Bitte hier einmal ausprobieren und einen  beliebigen Text <br>eingeben. Die Eingabe dann mit <strong>Enter</strong> best??tigen.<br> Danach kann das Experiment gestartet werden.</font>")
    .settings.css("width, 15%", "text-align, justify")


     ,
newTextInput("Probe")
    .size(280,40)
    ,
newCanvas("Codetest", 1000, 40)
    .settings.add(0,0,getText("Test"))
        .settings.add(420,2, getTextInput("Probe"))
           //.settings.center()
           .print()

,
newText("Leerzeile"," <br></p>")
    .center()
    .print()
,


getTextInput("Probe")
    .wait()
,

newText("Weiter","<p><br>Auf den Button klicken, um das Experiment zu beginnen.")
    .center()
    .print()
,
newButton("Weiter","Experiment beginnen")
    .center()
    .print()
    .wait()
    ),
//Zeitung
Template(
    GetTable("BListenaufteilung.csv")
    .setGroupColumn( "Liste" )
    ,
    row => newTrial( "Trial" ,
        defaultImage.css("margin","1em")
        ,
        newImage("Header","BHeader.png")
        .settings.css("width, 50%")
        .center().print()

        ,
        newCanvas("Top_nebeneinander","auto","auto")
            .add(600,40, newTextInput("Top_Korrektur").size(300,200) .lines(15) )
            .center().print()
        ,
        newHtml("TopImage",row.TopImage).print( getCanvas("Top_nebeneinander") )
            .settings.css("width","80%")
    ,
        newCanvas("Bottom_nebeneinander","auto","auto")
            .add(600,40, newTextInput("Bottom_Korrektur").size(300,200) .lines(15) )
            .center().print()
        ,
        newHtml("BottomImage",row.BottomImage).print( getCanvas("Bottom_nebeneinander") )
            .settings.css("width","80%")
        ,
        getTextInput("Top_Korrektur").log("final")
        ,
        getTextInput("Bottom_Korrektur").log("final")
        ,
        newText("Leerzeile"," <br></p>")
        .center()
        .print()
    ,
        newButton("Weiter","Weiter")
        .settings.css("font-family", "Courier New").settings.css("font-size", "14px")
        .center().print()
        .wait(
            newFunction('dummy', ()=>true).test.is(true)
            .and(getTextInput("Top_Korrektur").test.text(/^.+/)
                    .failure( newText('errorcode_top', "<br>Korrektur eingeben.Wenn nichts korrigiert werden soll: keine Korrekturen eingeben").color("red").print() )
            ).and(getTextInput("Bottom_Korrektur").test.text(/^.+/)
                    .failure( newText('errorcode_bottom', "<br>Korrektur eingeben.Wenn nichts korrigiert werden soll: keine Korrekturen eingeben").color("red").print() )
            ))
    )
    .log( "Group" , row.Liste  )
    .log( "TopText",row.TopImage )
    .log("BottomText",row.BottomImage)
),
    //Metadaten
    //Personenbezogene Daten Seite 1 - Alter, Geschlecht, Bildung, Sozialerstatus
newTrial("Meta1",
    newImage("HU","HU Logo.png")
        .size(289,65)
    ,
     newImage("SFB","SFB Logo.png")
        .size(280,86)
    ,
    newCanvas("Logosnebeneinander",1138,100)
        .add(100,0, getImage("HU"))
        .add(750,0, getImage("SFB"))
        .center()
        .print()
 ,

    newText("Meta-1", "<b>Personenbezogene Daten</b> <p>Wir brauchen einige Angaben von dir. Diese werden anonymisiert gespeichert und eine sp??tere Zuordnung zu Dir wird nicht m??glich sein. Bitte nimm Dir beim Ausf??llen der Felder Zeit.<p>")
 //       .settings.css("text-align","justify")
        .center()
        .print()

               ,
               newCanvas("democanvas", 800,120)
               .settings.add(0,0, getText("Meta-1"))
               //.settings.center()
               .print()
               ,
               //Alter
               newDropDown("age", "Bitte eine Option ausw&auml;hlen")
               .settings.add("12" , "13" , "14", "15" , "16" , "17", "18", "anderes")
               .log()

               ,
               newText("agetext", "Alter:")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newCanvas("agecanvas", 1000, 40)
               .settings.add(0,0,getText("agetext"))
               .settings.add(450,2, getDropDown("age"))
               //.settings.center()
               .print()
               ,
               //Geschlecht
               newText("sex", "Geschlecht:")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newDropDown("sex", "Bitte eine Option ausw&auml;hlen")
               .settings.add("Weiblich", "M&auml;nnlich", "Divers")
               .log()
               ,
               newCanvas("sexcanvas", 1000, 40)
               .settings.add(0, 0, getText("sex"))
               .settings.add(450,3, getDropDown("sex"))
               //.settings.center()
               .print()
               ,
               //Wohnort
               newText("wohnort", "Wohnort (Stadt, Region):")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newTextInput("wohnort")

               .log()
               ,
               newCanvas("wohnortcanvas", 1000, 40)
               .settings.add(0, 0, getText("wohnort"))
               .settings.add(450,3, getTextInput("wohnort"))
               //.settings.center()
               .print()
               ,
                newText("Leerzeile"," <br></p>")
                  .center()
                .print()
                 ,
                 //aufgewachsen
            newText("aufgewachsen", "Wo bist du aufgewachsen?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newTextInput("aufgewachsen")
                .log()
               //.settings.size(200,40)
               ,
               newCanvas("aufgewachsen", 1000,40)
               .settings.add(0,0, getText("aufgewachsen"))
               .settings.add(450,4,getTextInput("aufgewachsen"))
               //.settings.center()
               .print()
               ,
               newText("Leerzeile"," <br></p>")
                  .center()
                .print()
                 ,
                 //schulbesuch
                newText("schulbesuch", "Was f??r eine Schule besuchst du?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newDropDown("schulbesuch", "Bitte eine Option ausw&auml;hlen")
               .settings.add("Grundschule","Integrierte Sekundarschule (ISS)","Gymnasium","Fachgymnasium","Schulausbildung bereits beendet","Sonstige")     // MAYBE ADD QUESTIONS ABOUT DIALECT AND DOMINANT HAND
               //.settings.size(191,20)
               .log()
               ,
               newCanvas("schulbesuchcanvas", 1000, 40)
               .settings.add(0, 0, getText("schulbesuch"))
               .settings.add(470,4, getDropDown("schulbesuch"))
               //.settings.center()
               .print()
               ,
 
               newText("studium","<b>Studierst du schon?</b><br><small>(Falls ja, welches Fach und Fachsemester?)</small><br><br>")
               .settings.css("font-size", "18px")

               ,
               newTextInput("studiuminput")
               .settings.size(150,40)
               .log()
               .settings.hidden()
               ,
               newText("studium_input", "")
               .settings.after(getTextInput("studiuminput"))
               ,
               newDropDown("studium",  "<br>" +"Bitte eine Option ausw&auml;hlen")
               .settings.add("Ja", "Nein")
               .log()
               .settings.after(getText("studium_input"))
               .settings.callback(
                   getDropDown("studium")
                   .test.selected("Ja")
                   .success(getTextInput("studiuminput").settings.visible(

                   )) )
               ,
               newCanvas("studium", 1000, 40)
               .settings.add(0, 0, getText("studium"))
               .settings.add(500,3, getDropDown("studium"))
               //.settings.center()
               .print()
               ,
               newCanvas("filler", 1, 20)

               .print()
               ,

              //Leiter
             //   newText("Leiter","<b>Die untenstehende Leiter</b> repr&auml;sentiert den relativen Sozialstatus der Menschen in Deutschland. "
             //          +"An der Spitze der Leiter stehen Menschen mit relativ hohem Status ??? diejenigen, die das meiste Geld, die beste Bildung und die angesehensten Arbeitspl&auml;tze haben. Ganz unten sind Menschen mit relativ niedrigem Status ??? beispielsweise als arbeitslos Gemeldete. Relativ weit unten zu verorten w&auml;ren auch diejenigen, die nur wenig Geld verdienen, einen niedrigen Bildungstand haben, und / oder Berufe aus&uuml;ben, die die Gesellschaft als eher wenig respektabel ansieht."
             //          +"<br> Wo w&uuml;rdest du dich auf dieser Leiter einordnen? W&auml;hle bitte die Sprosse, die deinem empfundenen Sozialstatus am ehesten entspricht.")
             //  .settings.css("font-size", "18px")
             //  .settings.css("text-align","justify")
             //  ,
            //   newDropDown("leiter", "Bitte eine Option ausw&auml;hlen")
             //  .settings.add("A", "B", "C","D", "E", "F","G", "H", "I","J")
             //  .log()
              // ,
             //////  ,
              // newCanvas("leitercanvas", 1000,20)
            //   .settings.add(0, 10, getText("Leiter"))
               //.settings.center()
             //  .print()
              // ,
              // newCanvas("leitercanvas2", 1000,350)
              // .settings.add(250,200, getImage("leiter"))
             //  .settings.add(400,300, getDropDown("leiter"))
              // //.settings.center()
             //  .print()
             ////////  ,
    newButton("continue", "Weiter")
               .settings.css("font-family", "calibri").settings.css("font-size", "12px")
               //.settings.center()
               .log()
               .center()
               .print()
               .wait(
            newFunction('dummy', ()=>true).test.is(true)
            // age
            .and( getDropDown("age").test.selected()
                    .failure( newText('errorage', "<br>Bitte Alter angeben.").color("red") .center().print() )
            // sex
            ).and( getDropDown("sex").test.selected()
                    .failure( newText('errorsex', "<br>Bitte Geschlecht angeben.").color("red") .center().print() )
             // schulbesuch
            ) .and( getDropDown("schulbesuch").test.selected()
                    .failure( newText('errorschulbesuch', "<br>Bitte Schultyp angeben.").color("red") .center().print() )

            ).and( getDropDown("studium").test.selected()
                   .failure( newText('errorstudium', "<br>Bitte Studium angeben.").color("red") .center().print() )
//             ).and( getDropDown("schule").test.selected()
//                   .failure( newText('errorschule', "<br>Bitte Land der Beschulung angeben.").color("red") .center().print() )
            ).and(getDropDown("leiter").test.selected()
                   .failure( newText('leitererr', "<br>Bitte Variante auf der Leiter angeben.").color("red") .center().print() )

            ).and(
             getTextInput("wohnort").test.text(/^.+/) // testing if at least one digit was written in the input box
                .failure(
                   newText("wohnorter","<br>Bitte Wohnort angeben")
                   .settings.color("red")
                   .center()
                   .print())
                ).and(
             getTextInput("aufgewachsen").test.text(/^.+/) // testing if at least one digit was written in the input box
                .failure(
                   newText("aufgewachsener","<br>Bitte angeben, wo du aufgewachsen bist.")
                   .settings.color("red")
                   .center()
                   .print())

            )  )


               ,
               getDropDown("age").wait("first")
               ,
               getDropDown("sex").wait("first")
               ,
                getDropDown("studium").wait("first")
               ,
               getDropDown("leiter").wait("first")
               ,
               getDropDown("schulbesuch").wait("first")
  )
  ,
  //Metadaten 2: Sprachbiographie
newTrial("Meta2",
newImage("HU","HU Logo.png")
        .size(289,65)
    ,
        newImage("SFB","SFB Logo.png")
        .size(280,86)
    ,
    newCanvas("Logosnebeneinander",1138,100)
        .add(100,0, getImage("HU"))
        .add(750,0, getImage("SFB"))
        .center()
        .print()
    ,

       newText("SprachenMutter","<b>Welche Sprachen spricht/sprach deine Mutter?</b><br>Bitte sortieren und mit der am besten gesprochenen Sprache beginnen.")
 //       .center()
        .print()
,
    newCanvas("SprachenMutter", 1, 10)
        .center()
        .print()
,
    newTextInput("SprachenMutter")
 //       .center()
        .size(600,80)
        .print()
,
    getTextInput("SprachenMutter")
        .log("final")
,
newText("Leerzeile"," <br></p>")
    .center()
    .print()
,
    newText("SprachenVater","<b>Welche Sprachen spricht/sprach dein Vater?</b><br> Bitte sortieren und mit der am besten gesprochenen Sprache beginnen.")
  //      .center()
        .print()
,
    newCanvas("SprachenVater", 1, 10)
//        .center()
        .print()
,
    newTextInput("SprachenVater")
//        .center()
        .size(600,80)
        .print()
,
    getTextInput("SprachenVater")
        .log("final")
               ,
               newText("Leerzeile"," <br></p>")
                 .center()
                .print()
                 ,
       newText("SprachenSelbst","<b>Welche Sprachen sprichst du selbst im Alltag?</b><br> Mit wem und in welchen Situationen? Bitte sortieren und mit der am h??ufigsten gesprochenen Sprache beginnen.")
 //       .center()
        .print()
,
    newCanvas("SprachenSelbst", 1, 10)
 //       .center()
        .print()
,
    newTextInput("SprachenSelbst")
  //      .center()
        .size(600,80)
        .print()
,
    getTextInput("SprachenSelbst")
        .log("final")
    ,
 newText("Leerzeile"," <br></p>")
                 .center()
                .print()
                 ,

 newText("Dialekt","<b>Sprichst du einen Dialekt?</b><br> Mit wem und in welchen Situationen?")
//        .center()
        .print()
,
    newCanvas("Dialekt", 1, 10)
 //       .center()
        .print()
,

    newTextInput("Dialekt")
 //       .center()
 .size(600,80)
        .print()
,
    getTextInput("Dialekt")
        .log("final")
,
newText("Leerzeile"," <br></p>")
                 .center()
                .print()
                 ,

    newButton("Ende", "Experiment beenden und Daten abschicken")
               .settings.css("font-family", "calibri").settings.css("font-size", "18px")
               //.settings.center()
               .log()
               .center()
               .print()
               .wait(
            newFunction('dummy', ()=>true).test.is(true)
                .and(
             getTextInput("SprachenMutter").test.text(/^.+/) // testing if at least one digit was written in the input box
                .failure(
                   newText("errormutter","<br>Bitte Sprachen der Mutter angeben")
                   .settings.color("red")
                   .center()
                   .print()
                   )
                ).and(
             getTextInput("SprachenVater").test.text(/^.+/) // testing if at least one digit was written in the input box
                .failure(
                   newText("errorvater","<br>Bitte Sprachen des Vaters angeben.")
                   .settings.color("red")
                   .center()
                   .print()
                   )
                ).and(
             getTextInput("SprachenSelbst").test.text(/^.+/) // testing if at least one digit was written in the input box
                .failure(
                   newText("errorselbst","<br>Bitte angeben welche Sprachen du sprichst.")
                   .settings.color("red")
                   .center()
                   .print()
                   )
            ).and(
             getTextInput("Dialekt").test.text(/^.+/) // testing if at least one digit was written in the input box
                .failure(
                   newText("errordialekt","<br>Bitte Dialekt angeben.")
                   .settings.color("red")
                   .center()
                   .print())
            ) 

            )
 )
,

// Send results manually
SendResults("send");

newTrial("Final",
         newText("<p>Vielen Dank f&uuml;r deine Teilnahme! Die Studie ist hiermit beendet. </p>")
            .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
            .settings.center()
            .print()
        ,

        newText ("<p>Du kannst das Fenster jetzt schlie??en.")
            .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
            .settings.center()
            .print()
        ,
        newButton("void", "")
            .wait()


   );
