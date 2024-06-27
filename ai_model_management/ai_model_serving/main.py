# ai_model_serving/main.py
import tensorflow as tf
import tritonclient.http as triton_http

# Load the AI model
model = tf.keras.models.load_model("ai_model.h5")

# Create a Triton Inference Server client
triton_client = triton_http.InferenceServerClient(url="localhost:8000")

# Define a model serving function
def serve_model(input_data):
    # Preprocess the input data
    input_data = tf.image.resize(input_data, (224, 224))
    input_data = input_data / 255.0

    # Create a Triton inference request
    request = triton_http.InferInput("input", input_data)
    request.model_name = "ai_model"
    request.model_version = 1

    # Send the request to the Triton server
    response = triton_client.infer(request)

    # Postprocess the output data
    output_data = response.get_output("output")
    output_data = tf.argmax(output_data, axis=1)

    return output_data

# Start the model serving server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:serve_model", host="0.0.0.0", port=8001)
