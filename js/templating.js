

const htmlUpdater = (htmlEl, htmlTemplate, data) => {      
    if(Array.isArray(data)){
        for(let item of data){
        htmlEl.appendChild(htmlTemplate(item))
        }
    }
}

export default htmlUpdater
