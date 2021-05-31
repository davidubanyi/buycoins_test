//simple function to handle rendering the data on the html
const htmlRenderer = (data, htmlEl, htmlTemplate) => {
  //check if the data type is an array  
  if (Array.isArray(data)) {
    for (let item of data) {
      htmlEl.appendChild(htmlTemplate(item));
    }
  //check if there is a template to render with  
  } else if (htmlTemplate) {
    htmlEl.innerHTML = htmlTemplate(data);
  //render directly if no template is available  
  } else {
    if(data.typeof !== "String"){
      htmlEl.innerHTML = data.toString();
    } else{
      htmlEl.innerHTML = data
    }
  }
};

export default htmlRenderer;
