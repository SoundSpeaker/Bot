const googleTTS = require('google-tts-api'); 
const fs = require('fs');
const Stream = require('stream');

class VoiceCore {
 
   constructor() {}

    base64toBinary(base64Text){
      const audioBinaryStream = new Stream.Readable();
      audioBinaryStream.push(Buffer.from(base64Text, 'base64'));
      audioBinaryStream.push(null);
      return audioBinaryStream;
    }

    downloadFromInfoCallback(stream, text, { lang, slow, host, timeout }) {
        googleTTS.getAudioBase64(text, { lang, slow, host, timeout })
          .then(base64Audio => this.base64toBinary(base64Audio))
          .then(audioStream => audioStream.pipe(stream))
          .catch(console.error);
    }

    getVoiceStream(text, { lang = 'en', slow = false, host = 'https://translate.google.com', timeout = 10000 } = {}) {
      const stream = new Stream.PassThrough();
      this.downloadFromInfoCallback(stream, text, {lang, slow, host, timeout });
      return stream;
    }

    saveToFile(filePath, text, { lang = 'en-GB', slow = false, host, timeout } = {}) {
        const stream = new Stream.PassThrough();
        const writeStream = fs.createWriteStream(filePath);
        this.downloadFromInfoCallback(stream, text, { lang, slow, host, timeout });
        stream.pipe(writeStream);
        stream.on('end', () => writeStream.close());
    }

}

module.exports = { VoiceCore }