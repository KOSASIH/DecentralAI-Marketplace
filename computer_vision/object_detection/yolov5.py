import cv2
import numpy as np

class YOLOv5:
    def __init__(self, weights_path, config_path):
        self.net = cv2.dnn.readNetFromDarknet(config_path, weights_path)
        self.net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
        self.net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

    def detect(self, image):
        blob = cv2.dnn.blobFromImage(image, 1/255, (416, 416), [0,0,0], 1, crop=False)
        self.net.setInput(blob)
        outs = self.net.forward(self.getOutputsNames())
        return outs

    def getOutputsNames(self):
        layersNames = self.net.getLayerNames()
        return [layersNames[i[0] - 1] for i in self.net.getUnconnectedOutLayers()]

# Load YOLOv5 model
yolov5 = YOLOv5('yolov5s.weights', 'yolov5s.cfg')

# Example usage
image = cv2.imread('image.jpg')
outs = yolov5.detect(image)
print(outs)
