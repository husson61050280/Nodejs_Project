exports.checkIO = async (input_data) => {
  let response = {};
  let arr_hashtag = [];
  try {
    let {hashtag_1 , hashtag_2 , hashtag_3 , hashtag_4 , hashtag_5} = input_data;
    hashtag_1 =  hashtag_1.toUpperCase(); 
    hashtag_2 =  hashtag_2.toUpperCase(); 
    hashtag_3 =  hashtag_3.toUpperCase(); 
    hashtag_4 =  hashtag_4.toUpperCase(); 
    hashtag_5 =  hashtag_5.toUpperCase(); 
    const regEx = /^[A-Z]+$/;
    if(regEx.test(hashtag_1) && regEx.test(hashtag_2) && regEx.test(hashtag_3) && regEx.test(hashtag_4) && regEx.test(hashtag_5)) {
      console.log("pass")
      //แปลง hashtag ให้เป็นตัวใหญ่
      arr_hashtag = [hashtag_1 , hashtag_2 ,hashtag_3, hashtag_4,hashtag_5]
      let Account_IO = await generate_message(arr_hashtag)
      // console.log(Account_IO)
      // sort มากไปน้อย
      Account_IO = Account_IO.sort((a,b)=> (a.count_io > b.count_io) ? -1 : ((b.count_io > a.count_io) ? 1 : 0 ))
      // console.log("Sort" ,  Account_IO);
      response = {error: "" , data: Account_IO};
      return response;
    } 
    //input ไม่ตรงเงื่อนไข
    else {
      response = {error: "INPUT_FAILED" , data: ""}
      return response;
    }

  }catch(err) {
    console.log(err.message)
  }
};

const generate_message = (arr_hashtag) => {
  let Account_IO = [{}];
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let charactersLength = characters.length;
  for (let i = 0; i<926;i++){
    let result = '';
    //จำนวนสตริงในรอบนั้นๆ
    let length = (Math.floor(Math.random() * 140-30)+30)
  for (let j = 0; j<length; j++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
    let hashtag = arr_hashtag[(Math.floor(Math.random() * 5-1)+1)];
    let text = result+ " " +"#"+hashtag;
    // console.log("text" , text.length)
    let count_i = (text.match(/I/g) || []).length;
    let count_o = (text.match(/O/g) || []).length;
    if((text.length >= 30 && text.length <= 140) && (count_i >= 1 && count_o >= 1) && (count_i + count_o >= 5)) {
      Account_IO.push({text:text ,hashtag:hashtag, length:text.length, count_i:count_i , count_o:count_o , count_io:count_i+count_o }) 
      // console.log(Account_IO[i])
    }
  }
  return Account_IO;
}

