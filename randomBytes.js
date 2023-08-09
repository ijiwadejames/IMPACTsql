const {spawn} = require('child_process');

const openssl = spawn('/mingw64/bin/openssl', ['rand', '32']);

openssl.stdout.on('data', (data) => {
    const randomBytes = data.toString('hex');
    process.env.RANDOM_BYTES = randomBytes;
});

openssl.stderr.on('data', (data) => {
    console.error(`openssl error: ${data}`)
});
openssl.on('close', (code) => {
    if(code !== 0) {
        console.error(`openssl existed with code ${code}`);
    }
});