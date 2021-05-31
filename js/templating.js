const htmlUpdater = (data, htmlEl, htmlTemplate) => {      
    if(Array.isArray(data)){
        for(let item of data){
        htmlEl.appendChild(htmlTemplate(item))
        }
    } else if (htmlTemplate){
        htmlEl.innerHTML = htmlTemplate(data)
    } else {
        htmlEl.innerHTML = data.toString()
    }
}

export default htmlUpdater
