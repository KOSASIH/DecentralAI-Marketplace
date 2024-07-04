import torch
import torch.nn as nn
import torch.optim as optim
from torch.nn.utils.rnn import pad_sequence
from torch.utils.data import Dataset, DataLoader

class Encoder(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super(Encoder, self).__init__()
        self.hidden_dim = hidden_dim
        self.lstm = nn.LSTM(input_dim, hidden_dim, num_layers=1, batch_first=True)
        self.fc = nn.Linear(hidden_dim, output_dim)

    def forward(self, x):
        h0 = torch.zeros(1, x.size(0), self.hidden_dim).to(x.device)
        c0 = torch.zeros(1, x.size(0), self.hidden_dim).to(x.device)
        out, _ = self.lstm(x, (h0, c0))
        out = self.fc(out[:, -1, :])
        return out

class Decoder(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super(Decoder, self).__init__()
        self.hidden_dim = hidden_dim
        self.lstm = nn.LSTM(input_dim, hidden_dim, num_layers=1, batch_first=True)
        self.fc = nn.Linear(hidden_dim, output_dim)

    def forward(self, x, hidden):
        out, hidden = self.lstm(x, hidden)
        out = self.fc(out[:, -1, :])
        return out, hidden

class Seq2Seq(nn.Module):
    def __init__(self, encoder, decoder):
        super(Seq2Seq, self).__init__()
        self.encoder = encoder
        self.decoder = decoder

    def forward(self, src, trg):
        encoder_out = self.encoder(src)
        decoder_hidden = (encoder_out.unsqueeze(0), encoder_out.unsqueeze(0))
        decoder_out = torch.zeros(trg.size(0), trg.size(1), self.decoder.output_dim).to(trg.device)
        for i in range(trg.size(1)):
            decoder_input = trg[:, i, :].unsqueeze(1)
            decoder_out[:, i, :], decoder_hidden= self.decoder(decoder_input, decoder_hidden)
        return decoder_out

# Load pre-trained sequence-to-sequence model
encoder = Encoder(input_dim=512, hidden_dim=256, output_dim=256)
decoder = Decoder(input_dim=256, hidden_dim=256, output_dim=512)
seq2seq = Seq2Seq(encoder, decoder)

# Example usage
src = torch.tensor([[1, 2, 3, 4, 5]])
trg = torch.tensor([[6, 7, 8, 9, 10]])
out = seq2seq(src, trg)
print(out)
