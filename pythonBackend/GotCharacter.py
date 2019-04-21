def init_value(num):
	return num if num else 0

def increment_votes(current_value):
	return current_value + 1 if current_value else 1

def decrement_votes(current_value):
	return current_value - 1 if current_value else -1

class GotCharacter():
	ref = ""
	net = 0
	positive = 0
	negative = 0
	neutral = 0
	total = 0

	name = ""
	keywords = {}

	def __init__(self, ref, name, keywords):
		self.name = name
		self.ref = ref
		self.net = 	init_value(ref.child('net').get())
		self.positive = init_value(ref.child('positive').get())
		self.negative = init_value(ref.child('negative').get())
		self.neutral = init_value(ref.child('neutral').get())
		self.total = init_value(ref.child('total').get())
		self.keywords = keywords 

	def onPositive(self):
		self.positive = self.positive+1
		self.net = self.net+1
		self.total = self.total+1
		self.ref.child('net').transaction(increment_votes)
		self.ref.child('positive').transaction(increment_votes)
		self.ref.child('total').transaction(increment_votes)

	def onNegative(self):
		self.negative = self.negative+1
		self.net = self.net-1
		self.total = self.total+1
		self.ref.child('net').transaction(decrement_votes)
		self.ref.child('negative').transaction(increment_votes)
		self.ref.child('total').transaction(increment_votes)

	def onNeutral(self):
		self.neutral = self.neutral+1
		self.total = self.total+1
		self.ref.child('neutral').transaction(increment_votes)
		self.ref.child('total').transaction(increment_votes)

	def printStatus(self):
		print("\n");
		print("Name: " + self.name + "\nNet: " + str(self.net) + "\nPositive: " + str(self.positive) + \
			"\nNegative: " + str(self.negative) + "\nNeutral: " + str(self.neutral) + "\nTotal: " + str(self.total))