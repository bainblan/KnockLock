#include <Arduino.h>

// put function declarations here:

// GLOBAL VARIABLES
//  Define the GPIO pin for the external LED
const int touchPin = 4; // SIG pin connected here
const int ledPin = 5;   // External LED connected here
int lastState = LOW;    // Track the previous state of the sensor

void setup()
{
  // Use a very high baud rate for low latency
  Serial.begin(921600);

  pinMode(touchPin, INPUT); // The sensor sends data TO the ESP32
  pinMode(ledPin, OUTPUT);  // The ESP32 sends power TO the LED

  Serial.println("System Ready. Waiting for touch...");
}

void loop()
{
int currentState = digitalRead(touchPin);
  digitalWrite(ledPin, currentState); // Local LED feedback

  if (currentState != lastState) {
    Serial.println(currentState); // Send "1" or "0"
    lastState = currentState;
  }
}

// Write Helper Functions here