export default class Attachment {
    showFile(blob, fileExtension) {
        const newBlob = new Blob([blob], {
            type: `application/${fileExtension.replace('.', '')}`
        });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }
        const data = window.URL.createObjectURL(newBlob);
        setTimeout(() => {
            window.URL.revokeObjectURL(data);
        }, 100);
        return {
            data: data,
            size: newBlob.size
        };
        const link = document.createElement('a');
        link.href = data;
        setTimeout(() => {
            window.URL.revokeObjectURL(data);
        }, 100);
    }
    b64toBlob(b64Data, contentType = '', sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    }
    fileSize(file) {
        let u = 0;
        let s = 1024;
        while (file >= s || -file >= s) {
            file /= s;
            u++;
        }
        return (u ? file.toFixed(1) + ' ' : file) + ' KMGTPEZY'[u] + 'B';
    }
}
