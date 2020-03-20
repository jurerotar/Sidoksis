export default class Attachment {
    
    showFile(blob:Blob | string, fileExtension:string) {
        const newBlob:Blob = new Blob([blob], {
            type: `application/${fileExtension.replace('.', '')}`
        })
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }
        const data:string = window.URL.createObjectURL(newBlob);
        setTimeout(() => {
            window.URL.revokeObjectURL(data);
        }, 100);
        return {
            data: data,
            size: newBlob.size
        };
    }

    b64toBlob(b64Data:string, contentType:string = '', sliceSize:number = 512) {

        const byteCharacters:string = atob(b64Data);
        const byteArrays:Uint8Array[] = [];
    
        for (let offset:number = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
    
            const byteNumbers:number[] = new Array(slice.length);
            for (let i:number = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
    
        return new Blob(byteArrays, { type: contentType });
    }
    fileSize(file:number) {
        let u:number = 0; 
        let s:number = 1024;
        while (file >= s || -file >= s) {
            file /= s;
            u++;
        }
        return (u ? file.toFixed(1) + ' ' : file) + ' KMGTPEZY'[u] + 'B';
    }
}