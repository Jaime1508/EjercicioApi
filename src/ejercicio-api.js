import { LitElement, html, css } from 'lit';

export class EjercicioApi extends LitElement{
  static get properties(){
    return {
      mostrar: {type: Array},
      buscar: {type: Array},
      url: { type: String },
      method: { type: String }
    };
  }

  static get styles(){
    return css`
      #tabla{
        width: 100%;
        border-collapse: collapse;
      }

      tr:nth-of-type(odd){
        background: lightgray;
      }

      .container{
        margin: 3%;
      }

      th{
        background: #333;
        color: white;
        font-weight: bold;
      }

      td, th{
        padding: 6px;
        border: 1px solid #cccc;
        text-align: left;
      }
    `;
  }

  constructor(){
    super();

    this.mostrar = [];
    this.buscar = [];
    this.url="https://hp-api.onrender.com/api/characters";
    this.method="GET";
  }

  firstUpdated() {
    this.getData();
  }

  getData() {
    fetch(this.url, { method: this.method })
      .then((response) => {
      if (response.ok) return response.json();
        return Promise.reject(response);
    })
      .then((data) => { this._dataFormat(data) })
      .catch((error) => { console.warn("error", error) })
  }

  _dataFormat(data){
    let datos = [];
    data.forEach((dato) => {
      datos.push({
        actor: dato.actor,
        ancestry: dato.ancestry,
        dateOfBirth: dato.dateOfBirth,
        gender: dato.gender,
        house: dato.house,
        name: dato.name,
        image: dato.image
      });
    });
    this.mostrar = datos;
    this.buscar = datos;
  }

  render(){
    return html`
      <div class="container">
        <input type="text" id="form" @keyup=${this.buscarDato}>
        <button @click=${this.buscarDato}>Buscar por nombre</button>
        <button @click=${this.limpiarTexto}> limpiar</button>
        <select id="select">
          <option value="Gryffindor">Gryffindor</option>
          <option value="Ravenclaw">Ravenclaw</option>
          <option value="Slytherin">Slytherin</option>
          <option value="Hufflepuff">Hufflepuff</option>
        </select>
      </div>
      ${this.template}
    `;
  }

  get template(){
    return html`
      <table id='tabla'>
        <tr>
          <th>Actor</th>
          <th>Ancestro</th>
          <th>Fecha de nacimiento</th>
          <th>Género</th>
          <th>Casa</th>
          <th>Nombre</th>
          <th>Imagen</th>
        </tr>
        ${this.buscar.map(dato => html`
          <tr>
            <td>${dato.actor}</td>
            <td>${dato.ancestry}</td>
            <td>${dato.dateOfBirth}</td>
            <td>${dato.gender}</td>
            <td>${dato.house}</td>
            <td>${dato.name}</td>
            <td><img src=${dato.image}></img></td>
          </tr>
        `)}
      </table>
    `;
  }

  buscarDato(){
    const input = this.shadowRoot.querySelector("#form").value.toLowerCase();
    this.buscar = [];
    this.mostrar.map(dato => {
      const nombre = dato.name.toLowerCase();

      if(nombre.indexOf(input) !== -1){
        this.buscar = [...this.buscar, dato];
      }
    })
  }

  buscarDato2(){
    const input = this.shadowRoot.querySelector("#select").value.toLowerCase();
    console.log(input);
    this.buscar = [];
    this.mostrar.map(dato => {
      const casa = dato.house.toLowerCase();

      if(casa.indexOf(input) !== -1){
        this.buscar = [...this.buscar, dato];
      }
    })
  }

  limpiarTexto(){
    let texto = this.shadowRoot.querySelector("#form");
    texto.value = "";
  }

}

customElements.define('ejercicio-api', EjercicioApi);
