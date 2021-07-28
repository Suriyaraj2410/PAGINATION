


//TABLE DECLARATION
const table = document.createElement('table');
table.setAttribute('class','table addcontent table-striped table-dark table-bordered');
table.innerHTML=`
<thead class="thead thead-dark">
<tr>
    <th>#</th>
    <th>Name</th>
    <th>Email-ID</th>
</tr>
</thead>`;

document.body.append(table);

// Pagination declaration
const pagination = document.createElement("div");
pagination.className='pagination';
document.body.append(pagination);




//USERS

fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json',{
    method:"GET"
})

.then((data)=> data.json())
.then((data)=> {
    loadUsers((data.slice(0,10)))
    return data;
})

.then((data)=>{

    const noOfPages=Math.ceil(data.length/10);
    for(let i=1;i<=noOfPages;i++){
        const page = document.createElement('button');
        page.className='button';
        page.innerText = i;
        page.onclick=function(){
            const pageUsers = data.filter((user,index)=>index >= (i-1)*10  &&  index < i*10);
            document.querySelector('.tbody').remove();
            loadUsers(pageUsers);   
        }
        pagination.append(page);


    }
    

})

//LOAD CONTENT TO THE tr

function loadUsers(data){
    const table = document.querySelector('.addcontent')
    const tbody = document.createElement('tbody');
    tbody.className='tbody';
    data.forEach((userdata) => {
        tbody.innerHTML +=`
        <tr>
        <th>${userdata.id}</th>
        <td>${userdata.name}</td>
        <td>${userdata.email}</td>
        </tr>`;
});
    table.append(tbody);

}
