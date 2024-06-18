import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressService } from '../../../service/progress/progress.service';
import { Router } from '@angular/router';
import { DataService } from '../../../service/data/data.service';
import { FisiologicoComponent } from '../fisiologico/fisiologico.component';
import { Subscription } from 'rxjs';
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
  selector: 'app-cognitivo',
  standalone: true,
  imports: [FisiologicoComponent, HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './cognitivo.component.html',
  styleUrl: './cognitivo.component.css',
})

export class CognitivoComponent implements OnInit, OnDestroy {
  situaciones: Situacion[] = [];
  respuestas: { [key: number]: number } = {};
  
  data: any = {};
  private dataSubscription: Subscription | undefined;

  constructor(
    private progressService: ProgressService,
    private router: Router,
    private dataService: DataService
  ) {
    this.dataSubscription = this.dataService.datoEstudiante$.subscribe(data => {
      this.data = data;
    });
  }

  ngOnInit(): void {
    this.loadSituaciones();
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
  
  loadSituaciones(): void {
    this.situaciones = [];
  
    const preguntasText = [
      "Me preocupo fácilmente.",
      "Tengo pensamientos o sentimientos negativos sobre mí, tales como inferior a los demás, torpe, etc.",
      "Me siento inseguro de mí mismo.",
      "Doy demasiadas vueltas a las cosas sin llegar a decidirme.",
      "Siento miedo.",
      "Me cuesta concentrarme.",
      "Pienso que la gente se dará cuenta de mis problemas o de la torpeza de mis actos."
    ];
  
    const situacionesData = [
      {
        id: 1,
        descripcion: 'Ante un examen en el que me juego mucho o si voy a ser entrevistado para un trabajo importante.',
        preguntas: [0,5]
      },
      {
        id: 2,
        descripcion: 'Cuando voy a llegar tarde a una cita.',
        preguntas: [0]
      },
      {
        id: 3,
        descripcion: 'Cuando pienso en las muchas cosas que tengo que hacer.',
        preguntas: [3, 5]
      },
      {
        id: 4,
        descripcion: 'A la hora de tomar una decisión o resolver un problema difícil.',
        preguntas: [0, 5]
      },
      {
        id: 5,
        descripcion: 'En mi trabajo o cuando estudio.',
        preguntas: [2, 3]
      },
      {
        id: 6,
        descripcion: 'Cuando espero a alguien en un lugar concurrido.',
        preguntas: [0, 1, 3, 6]
      },
      {
        id: 7,
        descripcion: 'Si una persona del otro sexo está muy cerca de mí, rozándome, o si estoy en una situación sexual íntima.',
        preguntas: [3]
      },
      {
        id: 8,
        descripcion: 'Cuando alguien me molesta o cuando discuto.',
        preguntas: [1, 6]
      },
      {
        id: 9,
        descripcion: 'Cuando soy observado o mi trabajo es supervisado, cuando recibo críticas, o siempre que pueda ser evaluado negativamente.',
        preguntas: [5, 6]
      },
      {
        id: 10,
        descripcion: 'Si tengo que hablar en público.',
        preguntas: [0, 3, 5, 6]
      },
      {
        id: 11,
        descripcion: 'Cuando pienso en experiencias recientes en las que me he sentido ridículo, tímido, humillado, solo o rechazado.',
        preguntas: [5]
      },
      {
        id: 12,
        descripcion: 'Cuando tengo que viajar en avión o en barco.',
        preguntas: [2, 4, 5]
      },
      {
        id: 13,
        descripcion: 'Después de haber cometido algún error.',
        preguntas: [3, 4, 5, 6]
      },
      {
        id: 14,
        descripcion: 'Ante la consulta del dentista, las inyecciones, las heridas o la sangre.',
        preguntas: [0]
      },
      {
        id: 15,
        descripcion: 'Cuando voy a una cita con una persona del otro sexo.',
        preguntas: [4]
      },
      {
        id: 16,
        descripcion: 'Cuando pienso en mi futuro o en dificultades y problemas futuros.',
        preguntas: [5]
      },
      {
        id: 17,
        descripcion: 'En medio de multitudes o en espacios cerrados.',
        preguntas: [0, 1, 4, 5, 6]
      },
      {
        id: 18,
        descripcion: 'Cuando tengo que asistir a una reunión social o conocer gente nueva.',
        preguntas: [2, 5]
      },
      {
        id: 19,
        descripcion: 'En lugares altos, o ante aguas profundas.',
        preguntas: [0, 1, 2, 4, 6]
      },
      {
        id: 20,
        descripcion: 'Al observar escenas violentas.',
        preguntas: [0, 1, 4]
      },
      {
        id: 21,
        descripcion: 'Por nada en concreto.',
        preguntas: [0, 1, 2, 3, 4]
      },
      {
        id: 22,
        descripcion: 'A la hora de dormir.',
        preguntas: [0, 1, 6]
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
      { texto: 'Pocas veces.', valor: 1 },
      { texto: 'Unas veces sí', valor: 2 },
      { texto: 'Muchas veces', valor: 3 },
      { texto: 'Casi siempre', valor: 4 }
    ];
  }

  registrarRespuesta(situacionId: number, preguntaIndex: number, opcionValor: number) {
    // Obtener la situación actual
    const situacion = this.situaciones.find(s => s.id === situacionId);
    
    if (situacion) {
      // Obtener la pregunta actual
      const pregunta = situacion.preguntas[preguntaIndex];
      
      if (pregunta) {
        console.log(`Situación: ${situacion.descripcion}`);
        console.log(`Pregunta: ${pregunta.pregunta}`);
        console.log(`Respuesta: ${opcionValor}`);
      }
    }
  }
  
  testFisiologico(): void {
    // Guardar respuestas antes de navegar a la siguiente parte del test
    this.saveRespuestas();
    // Marcar la sección cognitiva como completada
    this.completeIndexTest();
    // Navegar a la siguiente parte del test usando router
    this.router.navigateByUrl(`${this.data.codigo_estudiante}/test/fisiologico`);
  }

  saveRespuestas(): void {
    // Aquí deberías enviar las respuestas a tu servicio o hacer lo necesario con ellas
    console.log('Respuestas guardadas:', this.respuestas);
  }

  completeIndexTest(): void {
    this.progressService.markPartAsCompleted('cognitivo');
  }
}
