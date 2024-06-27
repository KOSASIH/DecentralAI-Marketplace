# ai_model_security/main.py
import torch
import OpenSSL

# Load the AI model
model = torch.load("ai_model.pth")

# Define a function to encrypt the model
def encrypt_model(model):
    # Generate a random encryption key
    encryption_key = OpenSSL.rand.bytes(32)

    # Encrypt the model using AES-256-CBC
    encrypted_model = OpenSSL.crypto.encrypt(model, encryption_key, "AES-256-CBC")

    return encrypted_model, encryption_key

# Define a function to decrypt the model
def decrypt_model(encrypted_model, encryption_key):
    # Decrypt the model using AES-256-CBC
    decrypted_model = OpenSSL.crypto.decrypt(encrypted_model, encryption_key, "AES-256-CBC")

    return decrypted_model

# Encrypt the model
encrypted_model, encryption_key = encrypt_model(model)

# Save the encrypted model and encryption key
torch.save(encrypted_model, "ai_model_encrypted.pth")
with open("encryption_key.txt", "wb") as f:
    f.write(encryption_key)
