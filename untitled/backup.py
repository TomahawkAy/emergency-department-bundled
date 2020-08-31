import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVR
import seaborn as sns
import socketio

sio = socketio.Client()


def predict_patients(input_element):
    print('triggered')
    regressor = SVR(kernel='rbf')
    regressor.fit(X, y)
    predictedValue = sc_y.inverse_transform((regressor.predict(sc_X.transform(np.array([input_element])))))
    print(predictedValue)
    sio.emit('prediction_completed', {'data': str(predictedValue.astype(int))})


sns.set(font_scale=1.2)
dataset = pd.read_csv('data_set.csv')
X = dataset.loc[:, ['temperature', 'unresolvedMedicalFolders']].values.astype(int)
y = dataset.loc[:, ['numberOfPatients']].values.astype(int)
sc_X = StandardScaler()
sc_y = StandardScaler()
X = sc_X.fit_transform(X)
y = sc_y.fit_transform(y)
sio.connect('http://localhost:8000')
sio.sleep(2)


@sio.event
def connect():
    print("I'm connected!")


@sio.on('fetch_completed')
def data_received(data):
    print('data received')


@sio.on('requesting_prediction_python')
def send_prediction_to_server(data):
    print(data)
    predict_patients(data['data'])

    @sio.event
    def connect_error():
        print("The connection failed!")

    @sio.event
    def disconnect():
        print("I'm disconnected!")
