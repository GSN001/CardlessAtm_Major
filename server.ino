#include <LiquidCrystal.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <SoftwareSerial.h>
#include <stdlib.h>

//======================================WIFI CREDENTIALS for Hotspot==================================
const char* ssid = "cardlessAtm";
const char* password = "sastrinity"; 
int max_connection = 1;
const int RS = D2, EN = D3, d4 = D5, d5 = D6, d6 = D7, d7 = D8;
char * messagePadded1= "   Welcome to Cardless ATM   ";
char * messagePadded2= "Connect to CardlessATM WiFi";
String err = "";


LiquidCrystal lcd(RS, EN, d4, d5, d6, d7);
int flag =0;
//====================================================================================================
String URL;
int httpCode;
String payload;
String ID;
String state;
String cardNumber_sv[] = {"12345","67890","13579"};
int maxAmount[] = {10000,20000,30000};
String pin_sv[] = {"1234","6789","1357"};
String cardNumber = "";
int amount_rc = 0;
String pin_rc = "";
int check = -1;
//=============================================define the objects======================================
ESP8266WebServer server(80);
HTTPClient http;
//===============================================dafine the IP Address of the hotspot==================
IPAddress ip (10, 10, 10, 1);
IPAddress gateway (10, 10, 10, 1);
IPAddress subnet (255, 255, 255, 0);
//=========================================SETUP PART==================================================
void setup() {
  Serial.begin(115200);
  lcd.begin(16, 2);
  lcd.clear();  
  WiFi.mode(WIFI_AP);
  pinMode(A0,INPUT);
  Serial.println("Setup Access point");
  Serial.println("Disconnect from any other modes");
  WiFi.disconnect();
  Serial.println("stating access point with SSID" +String(ssid)); 
  WiFi.softAP(ssid, password, 4, false, max_connection); 
  WiFi.softAPConfig(ip, gateway, subnet);
  IPAddress myIP = WiFi.softAPIP();
  Serial.println(myIP);
  server.on("/",handleroot);
  server.on("/feed",feed);
  server.begin();
  
//  for(int i =0;i < 2; i++){
//  
//  for (int letter = 0; letter <= strlen(messagePadded1) - 16; letter++) 
//  {
//    showLettersHeading(0, letter);
//  }
//
//   for (int letter = 0; letter <= strlen(messagePadded2) - 16; letter++) 
//  {
//    showLetters(0, letter);
//  }
//
//
//  
//  }

}
//=====================================handle root page================================================
void handleroot(){
isValidCred(cardNumber, pin_rc);
  if( check> -1){
    if(amount_rc <= maxAmount[check]){
      String st = "";
      st.concat(maxAmount[check]);
      server.send(200,"text/plain",st );
      }else{
        server.send(200, "text/plain", "Max withdrawal amount:"+ maxAmount[check]);
        }
    }else{
      server.send(200, "text/plain", "Invalid Credentials");
      
      }
}
//===================================handle door sensor page===========================================
void feed(){
   cardNumber = server.arg("card");
   amount_rc = server.arg("amount").toInt();
   pin_rc = server.arg("pin");

//   String err = "";

  Serial.println(check);
  isValidCred(cardNumber, pin_rc);
  Serial.println(check);
    if( check> -1){
      if(amount_rc <= maxAmount[check]){
        err = "Transaction success !!   ";
        server.send(200,"text/plain", err);
        maxAmount[check]-=amount_rc;
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("  Cardless ATM   ");
        lcd.setCursor(0, 1);
//        lcd.print(err);
        for( int i=0;i<2;i++){
          for (int letter = 0; letter <= err.length()- 16; letter++) 
          {
            showMessage(0, letter);
          }
          }


        
        }else{
          err = "Max withdrawal amount:";
          err.concat(maxAmount[check]);
          server.send(200, "text/plain", err);
          lcd.clear();
          lcd.setCursor(0, 0);
          lcd.print("Cardless ATM");
          lcd.setCursor(0, 1);
//          lcd.print(err);
          for( int i=0;i<2;i++){
          for (int letter = 0; letter <= err.length() - 16; letter++) 
          {
            showMessage(0, letter);
          }
          }
          }
      }else{
        server.send(200, "text/plain", "Invalid Credentials");
        lcd.clear();
         lcd.setCursor(0, 0);
        lcd.print("  Cardless ATM");
        lcd.setCursor(0, 1);
        err = "Check your Card No/ Pin";
        for( int i=0;i<2;i++){
          for (int letter = 0; letter <= err.length() - 16; letter++) 
          {
            showMessage(0, letter);
          }
          }
        
        }
   check =-1;
 }

void isValidCred(String cardNo, String pin){
  int i=0, f=0;
  for( i=0;i<3;i++){
    if(cardNumber_sv[i].equals(cardNo) && pin_sv[i].equals(pin)){
      Serial.println(cardNo+"--"+pin+"@"+i);
     check =i;
     return;
      }
    }

    check = -1;
  
  
}

void showLettersHeading(int printStart, int startLetter)
{
  lcd.setCursor(printStart, 0);
  for (int letter = startLetter; letter <= startLetter + 15; letter++) // Print only 16 chars in Line #2 starting 'startLetter'
  {
    lcd.print(messagePadded1[letter]);
  }
  lcd.print(" ");
  delay(400);
}

void showLetters(int printStart, int startLetter)
{
  lcd.setCursor(printStart, 1);
  for (int letter = startLetter; letter <= startLetter + 15; letter++) // Print only 16 chars in Line #2 starting 'startLetter'
  {
    lcd.print(messagePadded2[letter]);
  }
  lcd.print(" ");
  delay(400);
}

void showMessage(int printStart, int startLetter)
{
  lcd.setCursor(printStart, 1);
  for (int letter = startLetter; letter <= startLetter + 15; letter++) // Print only 16 chars in Line #2 starting 'startLetter'
  {
    lcd.print(err[letter]);
  }
  lcd.print(" ");
  delay(700);
}


//==============================================LOOP===================================================
void loop (){
  if(flag == 0){
     for(int i =0;i < 2; i++){
  
  for (int letter = 0; letter <= strlen(messagePadded1) - 16; letter++) 
  {
    showLettersHeading(0, letter);
  }

   for (int letter = 0; letter <= strlen(messagePadded2) - 16; letter++) 
  {
    showLetters(0, letter);
  }


  
  }
  flag =1;
    }
      
      server.handleClient();  
}
