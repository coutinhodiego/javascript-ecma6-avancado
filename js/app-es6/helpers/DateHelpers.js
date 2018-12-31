export class DateHelper {

  constructor(){
    throw new Error('Esta classe não pode ser instanciada.');
  }

  static dateToText(data){
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }

  static textToDate(text){

    if(!/^\d{4}-\d{2}-\d{2}$/.test(text)){
      throw new Error('Nescessario o formato yyyy-mm-dd');
    }
    return new Date(text.split('-'));
  }

}
