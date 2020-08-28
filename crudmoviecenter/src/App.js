import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';

function App() {

  const baseUrl = "http://localhost/apiphp/";
  const[data, setData] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const opencloseInsertModal=()=>{
    setModalInsert(!modalInsert);
  }

  const opencloseEditModal=()=>{
    setModalEdit(!modalEdit);
  }

  const opencloseDeleteModal=()=>{
    setModalDelete(!modalDelete);
  }
  
  const [selectedMovie, setSelectedMovie] = useState({
    name: '',
    year: '',
    director: ''
  });

  const handleChange=e=>{
    const {name, value} = e.target;
    setSelectedMovie((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(selectedMovie);
  }

  const getrequest = async() => {
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const postrequest = async() => {
    var f = new FormData();
    f.append("name", selectedMovie.name);
    f.append("year", selectedMovie.year);
    f.append("director", selectedMovie.director);
    f.append("METHOD", "POST");

    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      opencloseInsertModal();
    }).catch(error=>{
      console.log(error);
    })
  }

  const putrequest = async() => {
    var f = new FormData();
    f.append("name", selectedMovie.name);
    f.append("year", selectedMovie.year);
    f.append("director", selectedMovie.director);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: selectedMovie.id}})
    .then(response=>{
      var nuevaData= data;
      nuevaData.forEach (movie => {
        if (movie.id === selectedMovie.id) {
          movie.name = selectedMovie.name;
          movie.year = selectedMovie.year;
          movie.director = selectedMovie.director;
        }
      });   

      setData(nuevaData);
      opencloseEditModal();
    }).catch(error=>{
      console.log(error);
    })
  }

  const deleterequest = async() => {
    var f = new FormData();
    f.append("name", selectedMovie.name);
    f.append("year", selectedMovie.year);
    f.append("director", selectedMovie.director);
    f.append("METHOD", "DELETE");

    await axios.post(baseUrl, f, {params: {id: selectMovie.id}})
    .then(response=>{
      setData(data.filter(movie=>movie.id!==selectedMovie.id));
      opencloseDeleteModal();
    }).catch(error=>{
      console.log(error);
    })
  }


  const selectMovie=(movie, caseSelected)=>{
    setSelectedMovie(movie);
    (caseSelected==="Edit") ?
    opencloseEditModal():
    opencloseDeleteModal();
  }

  useEffect(()=>{
    getrequest();
  },[])


  return (
    <div>
      <br />
      <button className="btn btn-success" onClick={()=>opencloseInsertModal()}>Insert New Movie</button>
      <br /><br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Year</th>
            <th>Director</th>
          </tr>
        </thead>
        <tbody>
          {data.map(movie=>(
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.name}</td>
                <td>{movie.year}</td>
                <td>{movie.director}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=>selectMovie(movie, "Edit")}>Edit</button> {" "}
                  <button className="btn btn-danger" onClick={()=>selectMovie(movie, "Delete")}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsert}>
        <ModalHeader>
          New Movie
        </ModalHeader>
        <ModalBody>
          <label>Name </label><br />
            <input type="text" className="form-control" name="name" onChange={handleChange} />
          <label>Year </label><br />
            <input type="text" className="form-control" name="year" onChange={handleChange} />
          <label>Director </label><br />
            <input type="text" className="form-control" name="director" onChange={handleChange} />
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>postrequest()} >Insert</button> {" "}
          <button className="btn btn-danger" onClick={()=>opencloseInsertModal()}>Cancel</button>
        </ModalFooter>

      </Modal>


      <Modal isOpen={modalEdit}>
        <ModalHeader>
          Edit Movie
        </ModalHeader>
        <ModalBody>
          <label>Name </label><br />
            <input type="text" className="form-control" name="name" onChange={handleChange} value={selectedMovie && selectedMovie.name} />
          <label>Year </label><br />
            <input type="text" className="form-control" name="year" onChange={handleChange} value={selectedMovie && selectedMovie.year} />
          <label>Director </label><br />
            <input type="text" className="form-control" name="director" onChange={handleChange} value={selectedMovie && selectedMovie.director} />
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>putrequest()} >Edit </button> {" "}
          <button className="btn btn-danger" onClick={()=>opencloseEditModal()}>Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete}>
        <ModalBody>
            Delete {selectedMovie && selectedMovie.name} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>deleterequest()} >Yes</button>
          <button className="btn btn-secondary" onClick={()=>opencloseDeleteModal()}>No</button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
