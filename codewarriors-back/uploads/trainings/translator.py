import speech_recognition as sr
import os
import sys
r = sr.Recognizer()
file=str(sys.argv[0])
sound=str(sys.argv[1])
output=str(sys.argv[3])
command2mp3 = "ffmpeg -i "+file+" "+sound
command2wav = "ffmpeg -i "+sound+" "+output
os.system(command2mp3)
os.system(command2wav)
harvard = sr.AudioFile(output)
with harvard as source:
    audio = r.record(source)
    text = r.recognize_google(audio, language='fr-FR')
    sys.stdout.write(text)

