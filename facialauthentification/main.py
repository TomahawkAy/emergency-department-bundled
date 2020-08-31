import face_recognition
import os
import cv2
import pymongo
import socketio

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["CodeWarriors"]
users = db["users"]
QUERY_CURSOR = users.find()
socket = socketio.Client()
socket.connect('http://localhost:8000')
socket.sleep(2)


@socket.event
def connect():
    print("facial authentication process is invoked")


@socket.event
def connect_error():
    print("The facial authentication process failed!")


@socket.event
def disconnect():
    print("facial authentication process disconnected!")


@socket.on('requesting_python_image_prediction')
def send_prediction_to_server(data):
    print('beginning of the process')
    print(data['imagePath'])
    u_image = face_recognition.load_image_file(data['imagePath'])
    u_encoder = face_recognition.face_encodings(u_image)[0]
    for image in data['images']:
        print(image['image'])
        if match_picture(u_encoder, image['image']):
            print(image['_id'])
            socket.emit('engaged_to_access', {'data': image['_id']})
            break
            # need to get the final

    # loop through the images ...


# C:\\Users\\atef ayedi\\Desktop\\pi-web\\images\\uknown\\profile-test.jpg

def match_picture(encoder, image):
    unknown = face_recognition.load_image_file(image)
    u_encoding = face_recognition.face_encodings(unknown)[0]
    result = face_recognition.compare_faces([encoder], u_encoding)
    if result[0]:
        print('matched ...')
        return True
    else:
        print('not matched')


def look_up_for_user(u_encoder):
    for user in users:
        # fetching for users in order to get the one with the matching image -*works perfectly*-
        image = face_recognition.load_image_file(user['image'])
        encoder = face_recognition.face_encodings(image)[0]
        result = face_recognition.compare_faces([u_encoder], encoder)
        if result[0]:
            print('picture is matched')
    print()
