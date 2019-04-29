import tweepy
import csv
import re

#override tweepy.StreamListener to add logic to on_status
class MyStreamListener(tweepy.StreamListener):

		tweet = {}
		idSelf = 0
		# Receives tweets, operates on them (more operations to come?)
		def on_status(self, status):
			try:
				if (hasattr(status,'extended_tweet')):
					tweetText = self.clean_tweet(status.extended_tweet['full_text'])
				else:
					tweetText = self.clean_tweet(status.text)
				created_at = status.created_at
				id = status.id
				if(re.search('[a-zA-Z]', tweetText)):
					# print('NUM stream tweets: ' + str(self.idSelf))
					# print("\n")
					self.idSelf += 1
					self.tweet["tweet"] = tweetText
					self.tweet["id"] = id
					self.tweet["sequence"] = self.idSelf
					self.tweet["created_at"] = created_at
					with open('#testThread7.csv', 'a', newline='') as csv_file:
						writer = csv.DictWriter(csv_file, self.tweet.keys())
						writer.writerow(self.tweet)
			except Exception as e:
				print(">>>>Encountered Exception Tweet: %s" % str(e))
				pass
			return True

		def on_disconnect(self, notice): 
			"""Called when twitter sends a disconnect notice Disconnect 
			codes are listed here: https://dev.twitter.com/docs/streaming-
			apis/messages#Disconnect_messages_disconnect """ 
			print(notice)
			print('DISCONNECTED')
			return 


		def on_stall_warning(self, status):
			print("stall warning")
			print(status)
			return True

		def on_error(self, status_code):
			print("Encountered error with status code:" + repr(status_code))
			return True

		def clean_tweet(self, tweet):
			''' 
			Utility function to clean tweet text by removing links, special characters 
			using simple regex statements. 
			'''
			return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())
