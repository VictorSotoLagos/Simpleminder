import React, { useState, useContext, useEffect } from "react";
import { putAtencion, fetchAtencionID } from "../../api/atencion.Service.js";
import { UsuarioContext } from "../../contexts/UsuarioContext.jsx";
import { fetchFichasPacientes } from "../../api/fichapacienteServices.js";
import { useParams, useNavigate } from "react-router-dom";
import { validateAtencion } from "../../helpers/atencionvalidations.js";
import "./AtencionFormStyle.css";
import { IoArrowBackCircle } from "react-icons/io5";

const ActualizarAtencion = () => {
  const { terapeuta } = useContext(UsuarioContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    id_paciente: "",
    id_terapeuta: terapeuta.id,
    fecha: "",
    hora: "",
    introduccion: "",
    datosAtencion: "",
    diagnosticoHipotesis: "",
    estadoDiagnostico: "",
    indicaciones: "",
    imagenes: [],
  };

  const [formData, setFormData] = useState(initialValues);
  const [pacientesTerapeuta, setPacientesTerapeuta] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Primer useEffect para cargar las fichas de pacientes
  useEffect(() => {
    const buscarFichasPacientes = async () => {
      const totalFichas = await fetchFichasPacientes();
      const pacientesTerapeuta = totalFichas
        .filter((ficha) => ficha.terapeutaAsignado === terapeuta.id)
        .sort((a, b) => a.nombre.localeCompare(b.nombre));
      setPacientesTerapeuta(pacientesTerapeuta);
    };
    buscarFichasPacientes();
  }, [terapeuta.id]);

  // Segundo useEffect para cargar la atención y sus imágenes
  useEffect(() => {
    const buscarAtencionPorID = async () => {
      try {
        const atencionSegunID = await fetchAtencionID(id);
        setFormData(atencionSegunID);

        if (atencionSegunID.imagenes && atencionSegunID.imagenes.length > 0) {
          setExistingImages(atencionSegunID.imagenes);

          const imageUrls = atencionSegunID.imagenes.map((img) => {
            const cleanPath = img.replace(/\\/g, "/").replace(/^uploads\//, "");
            return `${window.location.protocol}//${
              window.location.hostname
            }:8000/api/uploads/${encodeURIComponent(cleanPath)}`;
          });
          setImagePreviews(imageUrls);
        }
      } catch (error) {
        console.error("Error al cargar la atención:", error);
      }
    };
    if (id) buscarAtencionPorID();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagenes") {
      const fileArray = Array.from(files);
      setNewImages((prev) => [...prev, ...fileArray]);

      // Crear URLs para las nuevas imágenes
      const newImagePreviews = fileArray.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) => [...prev, ...newImagePreviews]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  // remueve imagenes sin borrar todo, esto ayudo a corregir un error fatal !!
  const handleRemoveImage = (index) => {
    if (index < existingImages.length) {
      // Remover imagen existente
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Remover imagen nueva
      const newIndex = index - existingImages.length;
      setNewImages((prev) => prev.filter((_, i) => i !== newIndex));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorValidacion = validateAtencion(formData);

    if (errorValidacion) {
      setErrorMessage(errorValidacion);
      return;
    }

    const formDataToSubmit = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "imagenes") {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    // Agregar imágenes existentes que no fueron eliminadas
    formDataToSubmit.append("existingImages", JSON.stringify(existingImages));

    // Agregar nuevas imágenes
    newImages.forEach((image) => {
      formDataToSubmit.append("imagenes", image);
    });

    try {
      await putAtencion(id, formDataToSubmit);
      setErrorMessage("Atención Actualizada con Éxito");
      navigate("/ver_atenciones"); //me manda a atenciones despues de actuaslizar
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  function formatDateToHTMLDate(mongoDate) {
    if (!mongoDate) return "";
    const date = new Date(mongoDate);
    return date.toISOString().split("T")[0];
  }

  const downloadImage = async (imageUrl, imageName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = imageName || "imagen.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando la imagen:", error);
    }
  };

  const handlePrint = () => {
    const selectedPatient = pacientesTerapeuta.find(
      (paciente) => paciente._id === formData.id_paciente
    );
    const patientName = selectedPatient
      ? `${selectedPatient.nombre} ${selectedPatient.apellidoUno} ${selectedPatient.apellidoDos}`
      : "";

    const printContents = `
      <div id="print-section" style="padding: 20px; font-family: Arial, sans-serif;">
        <style>
          @media print {
            body * {
              visibility: hidden;
            }
            #print-section, #print-section * {
              visibility: visible;
            }
            #print-section {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        </style>
        <h2 style="text-align: center;">Atención al Paciente</h2>
        <hr/>
        <div style="margin-bottom: 15px;">
          <p><strong>Paciente:</strong> ${patientName}</p>
          <p><strong>Fecha:</strong> ${formData.fecha}</p>
          <p><strong>Hora:</strong> ${formData.hora}</p>
        </div>
        <div style="margin-bottom: 15px;">
          <p><strong>Introducción:</strong></p>
          <p>${formData.introduccion}</p>
        </div>
        <div style="margin-bottom: 15px;">
          <p><strong>Datos de la Atención:</strong></p>
          <p>${formData.datosAtencion}</p>
        </div>
        <div style="margin-bottom: 15px;">
          <p><strong>Diagnóstico / Hipótesis:</strong></p>
          <p>${formData.diagnosticoHipotesis}</p>
        </div>
        <div style="margin-bottom: 15px;">
          <p><strong>Estado del Diagnóstico:</strong></p>
          <p>${formData.estadoDiagnostico}</p>
        </div>
        <div style="margin-bottom: 15px;">
          <p><strong>Indicaciones:</strong></p>
          <p>${formData.indicaciones}</p>
        </div>
      </div>
    `;

    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContents);
    printWindow.document.close();
    printWindow.focus();

    // Print after images are loaded
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="form-container">
      <button className="print-button" onClick={handlePrint}>
        🖨️ Imprimir
      </button>
      <div className="nueva-atencion">
        <div className="nueva-atencion-form-title">
          <h3>Editar Atención</h3>

          <button
            onClick={() => navigate("/ver_atenciones")}
            className="actualizar-atencion-back-button"
          >
            <IoArrowBackCircle size={30} />
          </button>
        </div>
        <p
          style={{
            color: "red",
            fontSize: "15px",
            margin: "0px",
          }}
        >
          {errorMessage ? errorMessage : "\u00A0"}
        </p>
        <div className="nueva-atencion-form-container">
          <form
            className="nueva-atencion-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <label htmlFor="id_paciente">
              Paciente:<span style={{ fontSize: "15px", color: "red" }}>*</span>
            </label>
            <select
              name="id_paciente"
              value={formData.id_paciente}
              onChange={handleInputChange}
              disabled
            >
              <option value="" disabled>
                Seleccione un paciente
              </option>
              {pacientesTerapeuta.map((paciente) => (
                <option key={paciente._id} value={paciente._id}>
                  {paciente.nombre} {paciente.apellidoUno}{" "}
                  {paciente.apellidoDos} - {paciente.run}
                </option>
              ))}
            </select>

            <label htmlFor="fecha">
              Fecha:<span style={{ fontSize: "15px", color: "red" }}>*</span>
            </label>
            <input
              type="date"
              name="fecha"
              value={formatDateToHTMLDate(formData.fecha)}
              onChange={handleInputChange}
            />

            <label htmlFor="hora">
              Hora:<span style={{ fontSize: "15px", color: "red" }}>*</span>
            </label>
            <input
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleInputChange}
            />

            <label htmlFor="introduccion">Introducción:</label>
            <textarea
              name="introduccion"
              value={formData.introduccion}
              onChange={handleInputChange}
            ></textarea>

            <label htmlFor="datosAtencion">Datos de la Atención:</label>
            <textarea
              name="datosAtencion"
              value={formData.datosAtencion}
              onChange={handleInputChange}
            ></textarea>

            <label htmlFor="diagnosticoHipotesis">
              Diagnóstico / Hipótesis:
              <span style={{ fontSize: "15px", color: "red" }}>*</span>
            </label>
            <select
              name="diagnosticoHipotesis"
              value={formData.diagnosticoHipotesis}
              onChange={handleInputChange}
            >
              <option value="">
                Seleccione un diagnóstico / hipótesis
                <span style={{ fontSize: "15px", color: "red" }}>*</span>
              </option>
              <option value="Confirmado">Confirmado</option>
              <option value="Hipotesis">Hipotesis</option>
              <option value="De alta">De alta</option>
              <option value="Cierre de caso">Cierre de caso</option>
            </select>

            <label htmlFor="estadoDiagnostico">Estado del Diagnóstico:</label>
            <input
              type="text"
              name="estadoDiagnostico"
              value={formData.estadoDiagnostico}
              onChange={handleInputChange}
            />

            <label htmlFor="indicaciones">Indicaciones:</label>
            <textarea
              name="indicaciones"
              value={formData.indicaciones}
              onChange={handleInputChange}
            ></textarea>

            <label htmlFor="imagenes">Subir Imágenes:</label>
            <input
              type="file"
              name="imagenes"
              multiple
              onChange={handleInputChange}
            />

            <div className="image-previews">
              {imagePreviews.map((src, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={src}
                    alt={`preview ${index}`}
                    onClick={() =>
                      downloadImage(src, `imagen_${index + 1}.jpg`)
                    }
                    onError={(e) => {
                      console.error(`Error loading image: ${src}`);
                      e.target.src =
                        "https://via.placeholder.com/100?text=Error";
                    }}
                    style={{
                      cursor: "pointer",
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit">Actualizar Atención</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActualizarAtencion;
