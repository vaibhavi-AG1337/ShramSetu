from twilio.rest import Client
from config import Config
import logging
from flask import current_app

class SMSService:
    _instance = None
    
    def __init__(self):
        if SMSService._instance is None:
            self.client = Client(Config.TWILIO_ACCOUNT_SID, Config.TWILIO_AUTH_TOKEN)
            self.phone_number = Config.TWILIO_PHONE_NUMBER
            SMSService._instance = self
            logging.info("Twilio SMS service initialized")

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = SMSService()
        return cls._instance

    def send_sms(self, to_number, message):
        """Sends SMS via Twilio with error handling"""
        try:
            # Validate phone number format
            if not to_number.startswith('+'):
                to_number = f"+91{to_number}"  # Default to India if no country code
            
            # Send SMS
            message = self.client.messages.create(
                body=message,
                from_=self.phone_number,
                to=to_number
            )
            
            logging.info(f"✉️ SMS sent to {to_number} (Twilio SID: {message.sid})")
            return True
            
        except Exception as e:
            logging.error(f"Failed to send SMS to {to_number}: {str(e)}")
            return False