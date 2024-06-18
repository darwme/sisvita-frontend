import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressService } from '../../../service/progress/progress.service';
import { Router } from '@angular/router';
import { DataService } from '../../../service/data/data.service';
import { Subscription } from 'rxjs';
import { EndComponent } from '../end/end.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';

interface Opcion {
  texto: string;
  valor: number;
}

interface Pregunta {
  numero: number;
  pregunta: string;
  opciones: Opcion[];
}

interface Situacion {
  id: number;
  descripcion: string;
  preguntas: Pregunta[];
}

@Component({
  selector: 'app-motor',
  standalone: true,
  imports: [EndComponent, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './motor.component.html',
  styleUrls: ['./motor.component.css'],
})

export class MotorComponent implements OnInit, OnDestroy {
  situaciones: Situacion[] = [];
  respuestas: { [key: number]: number } = {};
  
  data: any = {};
  private dataSubscription: Subscription | undefined;

  constructor(
    private progressService: ProgressService,
    private router: Router,
    private dataService: DataService
  ) {
    // Subscribe to data from DataService
    this.dataSubscription = this.dataService.datoEstudiante$.subscribe(data => {
      this.data = data;
    });
  }

  ngOnInit(): void {
    this.loadSituaciones(); // Load the situational questions
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
  
  loadSituaciones(): void {
    this.situaciones = [];
  
    const preguntasText = [
      "Lloro con facilidad.",
      "Realizo movimientos repetitivos con alguna parte de mi cuerpo (rascarme, tocarme, movimientos rítmicos con pies o manos, etc.)",
      "Fumo, como o bebo demasiado.",
      "Trato de evitar o rehuir la situación.",
      "Me muevo y hago cosas sin una finalidad concreta.",
      "Quedo paralizado o mis movimientos son torpes.",
      "Tartamudeo o tengo otras dificultades de expresión verbal."
  
    ];
  
    const situacionesData = [
      {
        id: 1,
        descripcion: 'Ante un examen en el que me juego mucho o si voy a ser entrevistado para un trabajo importante.',
        preguntas: [1,4,5]
      },
      {
        id: 2,
        descripcion: 'Cuando voy a llegar tarde a una cita.',
        preguntas: [1,4]
      },
      {
        id: 3,
        descripcion: 'Cuando pienso en las muchas cosas que tengo que hacer.',
        preguntas: [0,1,2,4,5,6]
      },
      {
        id: 4,
        descripcion: 'A la hora de tomar una decisión o resolver un problema difícil.',
        preguntas: [2,4,6]
      },
      {
        id: 5,
        descripcion: 'En mi trabajo o cuando estudio.',
        preguntas: [0,2,5]
      },
      {
        id: 6,
        descripcion: 'Cuando espero a alguien en un lugar concurrido.',
        preguntas: [2,3]
      },
      {
        id: 7,
        descripcion: 'Si una persona del otro sexo está muy cerca de mí, rozándome, o si estoy en una situación sexual íntima.',
        preguntas: [2]
      },
      {
        id: 8,
        descripcion: 'Cuando alguien me molesta o cuando discuto.',
        preguntas: [1,2,5]
      },
      {
        id: 9,
        descripcion: 'Cuando soy observado o mi trabajo es supervisado, cuando recibo críticas, o siempre que pueda ser evaluado negativamente.',
        preguntas: [1,2,5]
      },
      {
        id: 10,
        descripcion: 'Si tengo que hablar en público.',
        preguntas: [2]
      },
      {
        id: 11,
        descripcion: 'Cuando pienso en experiencias recientes en las que me he sentido ridículo, tímido, humillado, solo o rechazado.',
        preguntas: [1,2,4]
      },
      {
        id: 12,
        descripcion: 'Cuando tengo que viajar en avión o en barco.',
        preguntas: [1,3,4,5]
      },
      {
        id: 13,
        descripcion: 'Después de haber cometido algún error.',
        preguntas: [0,2]
      },
      {
        id: 14,
        descripcion: 'Ante la consulta del dentista, las inyecciones, las heridas o la sangre.',
        preguntas: [4,6]
      },
      {
        id: 15,
        descripcion: 'Cuando voy a una cita con una persona del otro sexo.',
        preguntas: [3]
      },
      {
        id: 16,
        descripcion: 'Cuando pienso en mi futuro o en dificultades y problemas futuros.',
        preguntas: [1,2]
      },
      {
        id: 17,
        descripcion: 'En medio de multitudes o en espacios cerrados.',
        preguntas: [0,1,2,4,5]
      },
      {
        id: 18,
        descripcion: 'Cuando tengo que asistir a una reunión social o conocer gente nueva.',
        preguntas: [0,2,3,5,6]
      },
      {
        id: 19,
        descripcion: 'En lugares altos, o ante aguas profundas.',
        preguntas: [5]
      },
      {
        id: 20,
        descripcion: 'Al observar escenas violentas.',
        preguntas: [2,4]
      },
      {
        id: 21,
        descripcion: 'Por nada en concreto.',
        preguntas: [6]
      },
      {
        id: 22,
        descripcion: 'A la hora de dormir.',
        preguntas: [4]
      }
    ];

    this.situaciones = situacionesData.map((situacion) => {
      const preguntas = situacion.preguntas.map((preguntaIndex) => {
        return {
          numero: preguntaIndex + 1,
          pregunta: preguntasText[preguntaIndex],
          opciones: this.createOpciones()
        };
      });
      return {
        id: situacion.id,
        descripcion: situacion.descripcion,
        preguntas
      };
    });
  }

  createOpciones(): Opcion[] {
    return [
      { texto: 'Casi Nunca', valor: 0 },
      { texto: 'Pocas veces', valor: 1 },
      { texto: 'Unas veces sí', valor: 2 },
      { texto: 'Muchas veces', valor: 3 },
      { texto: 'Casi siempre', valor: 4 }
    ];
  }

  registrarRespuesta(situacionId: number, preguntaIndex: number, opcionValor: number) {
    // Obtain the current situation
    const situacion = this.situaciones.find(s => s.id === situacionId);
    
    if (situacion) {
      // Obtain the current question
      const pregunta = situacion.preguntas[preguntaIndex];
      
      if (pregunta) {
        console.log(`Situación: ${situacion.descripcion}`);
        console.log(`Pregunta: ${pregunta.pregunta}`);
        console.log(`Respuesta: ${opcionValor}`);
      }
    }
  }
  
  testEnd(): void {
    // Save responses before navigating to the next part of the test
    this.saveRespuestas();
    // Mark the motor section as completed
    this.completeIndexTest();
    // Navigate to the next part of the test using the router
    this.router.navigateByUrl(`${this.data.codigo_estudiante}/test/end`);
  }

  saveRespuestas(): void {
    // Here you should send the responses to your service or do what's needed with them
    console.log('Respuestas guardadas:', this.respuestas);
  }

  completeIndexTest(): void {
    this.progressService.markPartAsCompleted('motor');
  }
}
