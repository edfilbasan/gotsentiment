from time import sleep

class FileWatcher(object):
	def __init__(self, file, delay=0.5):
		self.file = file
		self.delay = delay

	def __iter__(self):
		while True:
			where = self.file.tell()
			line = self.file.readline()
			if line and line.endswith('\n'): ## only emit full lines
				yield line
		else:
			print("Waiting for new line")
			time.sleep(self.delay)
			self.file.seek(where)