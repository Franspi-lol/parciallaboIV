document.addEventListener("DOMContentLoaded", function () {
    class Persona {
        constructor(lastName, firstName, pass, mail) {
            this.lastName = lastName;
            this.firstName = firstName;
            this.pass = pass;
            this.mail = mail;
        }
        getPass() {
            return this._pass;
        }

        getLastName() {
            return this.lastName;
        }

        getEmail() {
            return this.email;
        }

        getNombre() {
            return this.firstName;
        }

        fullName() {
            return this.firstName + ' ' + this.lastName;
        }
    }
    const formulario = document.getElementById("form1");
    const boton1 = document.getElementById("boton1");
    const personaList = [];

    boton1.addEventListener("click", (evento1) => {
        evento1.preventDefault();
        var apellido = document.getElementById("apellido");
        var nombre = document.getElementById("nombre");
        var mail = document.getElementById("email");
        var pass = document.getElementById("pass");


        //console.log(apellido.value );
        if (apellido.value === "" || nombre.value === "" || mail.value === "" || pass.value === "") {
            alert("no puede estar en blanco");
        }
        else {
            let Persona1 = new Persona(apellido.value, nombre.value, pass.value, mail.value);
            console.log(Persona1.getNombre());
            personaList.push(Persona1);
            console.log(personaList);
        }
    })
    const login = document.getElementById("login");
    login.addEventListener("click", (evento2) => {
        evento2.preventDefault();
        var mailLog = document.getElementById("mailLog");
        var passLog = document.getElementById("passLog");
        var flag = false;
        if (personaList.length != 0) {
            personaList.forEach(elemento => {
                if (mailLog.value === elemento.mail && passLog.value === elemento.pass) {
                    console.log("aaaaaaa");
                    flag = true;
                }

            })
            if (flag == false) {
                alert("Mail o contraseña invalidos");
            }
            else
            {

                const lista = document.getElementById("lista");
                lista.innerHTML=`<table>
                <caption>Peliculas</caption>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Fecha Estreno</th>
                        <th>Poster</th>
                    </tr>
                    
                </thead>
                <tbody id="tbody">
                    
                </tbody>
            </table>`
                verPeliculas();
            }
        }
        else {
            alert("No hay usuarios registrados");
        }
    })


    const url = 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'acc5735794msh3796d18570b950ep1c87b9jsn2e812677109d',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };


    async function verPeliculas()
    {
        const tabla = document.getElementById("tbody");
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            for(const pelicula of result.results)
            {
                /* const li =document.createElement("li");
                li.innerText = `Titulo= ${pelicula.originalTitleText.text}`
                lista.appendChild(li); */
                const flagPelicula=false;
                const tr =document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const img = document.createElement("img");
                td1.innerText=`${pelicula.originalTitleText.text}`
                td2.innerText=`${pelicula.releaseDate.day}/${pelicula.releaseDate.month}/${pelicula.releaseDate.year}`///day month year
                if(pelicula.primaryImage!=null)
                {
                    img.src=`${pelicula.primaryImage.url}`;
                    img.width=`100`;
                    img.height=`100`;
                    //flagPelicula=true;

                }
                else
                {
                    //flagPelicula=false;
                }
               
                tabla.appendChild(tr);
                tabla.appendChild(td1);
                tabla.appendChild(td2);

                tabla.appendChild(td3);
                if(pelicula.primaryImage!=null)
                {
                    td3.appendChild(img);
                }
                else
                {
                    td3.innerText="sin imagen";
                    
                }
                

            }
        } catch (error) {
            console.error(error);
        }
    }
    



})