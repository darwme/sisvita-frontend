import { Component } from '@angular/core';

interface Pregunta {
  situacionNombre: string;
  situacion: string;
  pregunta: string;
}

@Component({
  selector: 'app-cognitivo',
  //standalone: true,
  //imports: [],
  templateUrl: './cognitivo.component.html',
  styleUrls: ['./cognitivo.component.css']
})
export class CognitivoComponent {
  // Lista de preguntas y situaciones inicial
  datosCognitivos: Pregunta[] = [
    {
      situacionNombre: 'Examen importante',
      situacion: 'Ante un examen en el que me juego mucho.',
      pregunta: '¿Me preocupo fácilmente?'
    },
    {
      situacionNombre: 'Entrevista laboral',
      situacion: 'Si voy a ser entrevistado para un trabajo importante.',
      pregunta: '¿Me cuesta concentrarme?'
    },
    {
      situacionNombre: 'Hablar en público',
      situacion: 'Al tener que hablar en público en una gran reunión.',
      pregunta: '¿Me siento nervioso?'
    }
  ];

  // Índice de la pregunta/situación actual
  indiceActual: number = 0;

  // Respuesta seleccionada
  respuestaSeleccionada: number | null = null;

  // Función para avanzar a la siguiente pregunta
  onContinuar(): void {
    console.log(`Respuesta seleccionada para "${this.datosCognitivos[this.indiceActual].pregunta}": ${this.respuestaSeleccionada}`);
    
    // Avanza al siguiente conjunto de datos
    this.indiceActual++;
    this.respuestaSeleccionada = null;

    // Si todas las preguntas se han contestado
    if (this.indiceActual >= this.datosCognitivos.length) {
      console.log('¡Terminaste todas las preguntas!');
      // Puedes agregar lógica para manejar la finalización del cuestionario
      // this.indiceActual = 0; // Reiniciar para volver a empezar, opcional
    }
  }

  // Método para agregar una nueva pregunta dinámicamente
  agregarPregunta(situacionNombre: string, situacion: string, pregunta: string): void {
    this.datosCognitivos.push({ situacionNombre, situacion, pregunta });
  }
}
