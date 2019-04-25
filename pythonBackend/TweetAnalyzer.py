import re
from textblob import TextBlob
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

from GotCharacter import GotCharacter
# Fetch the service account key JSON file contents
cred = credentials.Certificate('gotsentiment-service-file.json')
import charSets

# Initialize the app with a service account, granting admin privileges
defualt_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://gotsentiment.firebaseio.com'
})

charRef = db.reference('characters')

cerseiChar = GotCharacter(charRef.child("cersei"), "Cersei", charSets.cerseiSet)
danyChar = GotCharacter(charRef.child("daenerys"), "Dany", charSets.danySet)
jonChar = GotCharacter(charRef.child("jon"), "Jon", charSets.jonSet)
aryaChar = GotCharacter(charRef.child("arya"), "Arya", charSets.aryaSet)
sansaChar = GotCharacter(charRef.child("sansa"), "Sansa", charSets.sansaSet)
branChar = GotCharacter(charRef.child("bran"), "Bran", charSets.branSet)
tyrionChar = GotCharacter(charRef.child("tyrion"), "Tyrion", charSets.tyrionSet)
jaimeChar = GotCharacter(charRef.child("jaime"), "Jaime", charSets.jaimeSet)
# donaldChar = GotCharacter(charRef.child("donald"), "Donald", charSets.donaldSet)

charList = [cerseiChar, danyChar, jonChar, aryaChar, sansaChar, branChar, tyrionChar, jaimeChar]
class TweetAnalyzer():
	num = 0
	def analyze(self, tweetText):
		# print( "Analyze this text: " + tweetText)
		words = tweetText.split()
		# print(words)
		lowerWords = [x.lower() for x in words]
		wordSet = set(lowerWords)
		# with open("afterEpisode2.txt", "a") as file:
		# 	file.write(self.clean_tweet(status.text))
		# 	file.write("\n")
		for char in charList:
			if(not wordSet.isdisjoint(char.keywords)):
				self.num += 1
				print("num sent to update character: " + str(self.num))
				self.updateCharacter(char, self.get_tweet_sentiment(tweetText))

	def updateCharacter(self, char, sentiment):
		if(sentiment== 'positive'):
			char.onPositive()
		elif(sentiment == 'negative'):
			char.onNegative()
		else:
			char.onNeutral()
		# char.printStatus()

	def get_tweet_sentiment(self, tweet):
		'''
		Utility function to classify sentiment of passed tweet
		using textblob's sentiment method
		'''
		# create TextBlob object of passed tweet text (this is where analysis happens)
		analysis = TextBlob(self.clean_tweet(tweet))
		# set sentiment
		if analysis.sentiment.polarity > 0:
				return 'positive'
		elif analysis.sentiment.polarity == 0:
				return 'neutral'
		else:
				return 'negative'
	def clean_tweet(self, tweet):
		''' 
		Utility function to clean tweet text by removing links, special characters 
		using simple regex statements. 
		'''
		return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())
