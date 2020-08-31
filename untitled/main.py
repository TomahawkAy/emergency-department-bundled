import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVR
import seaborn as sns
import socketio


def predict(input_element):
    regressor = SVR(kernel='rbf')
    regressor.fit(X, y)
    predicValue = sc_y.inverse_transform((regressor.predict(sc_X.transform(np.array([input_element])))))
    value=str(predicValue.astype(int))
    print(value,sc_y)
    return predict


dataset = pd.read_csv('data_set.csv')
X = dataset.loc[:, ['temperature', 'unresolvedMedicalFolders']].values.astype(int)
y = dataset.loc[:, ['numberOfPatients']].values.astype(int)
sc_X = StandardScaler()
sc_y = StandardScaler()
X = sc_X.fit_transform(X)
y = sc_y.fit_transform(y)
predict([0, 0])
