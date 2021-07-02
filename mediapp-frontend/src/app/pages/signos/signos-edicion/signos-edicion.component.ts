import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Paciente } from 'src/app/_model/paciente';
import { Signos } from 'src/app/_model/signos';
import { PacienteService } from 'src/app/_service/paciente.service';
import { SignosService } from './../../../_service/signos.service';

@Component({
  selector: 'app-signos-edicion',
  templateUrl: './signos-edicion.component.html',
  styleUrls: ['./signos-edicion.component.css']
})
export class SignosEdicionComponent implements OnInit {

  //maxFecha: Date = new Date();
  //fechaSeleccionada: Date = new Date();

  pacientes$: Observable<Paciente[]>;
  //idPacienteSeleccionado: number;
  
  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private signosService: SignosService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listarPacientes();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'idPaciente': new FormControl(''),
      'fechaSeleccionada': new FormControl(''),
      'temperatura': new FormControl(''),
      'pulso': new FormControl(''),
      'ritmoRespiratorio': new FormControl('')
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    })
  }

  operar(): void {
    let paciente = new Paciente();
    paciente.idPaciente = this.form.value['idPaciente'];

    let signos = new Signos();
    signos.idSignos = this.form.value['id'];
    signos.paciente = paciente;
    signos.fecha = moment(this.form.value['fechaSeleccionada']).format('YYYY-MM-DDTHH:mm:ss');
    signos.temperatura = this.form.value['temperatura'];
    signos.pulso = this.form.value['pulso'];
    signos.ritmoRespiratorio = this.form.value['ritmoRespiratorio'];

    if (this.edicion) {
      this.signosService.modificar(signos).subscribe(()=>{
        this.signosService.listar().subscribe(data => {
        this.signosService.setSignoscambio(data);
        this.signosService.setMensajeCambio('EDICION EXITOSA');
        });
      });
    } else {
      this.signosService.registrar(signos).subscribe(()=>{
        this.signosService.listar().subscribe(data => {
          this.signosService.setSignoscambio(data);
          this.signosService.setMensajeCambio('REGISTRO EXITOSO');
        });
      });
    }
    this.router.navigate(['/pages/signos']);  
  }

  listarPacientes() {
    this.pacientes$ = this.pacienteService.listar();
  }

  initForm(){
    if(this.edicion){
      this.signosService.listarPorId(this.id).subscribe(data => {FormGroup
        this.form = new FormGroup({
          'id': new FormControl(data.idSignos),
          'idPaciente': new FormControl(data.paciente.idPaciente),
          'fechaSeleccionada': new FormControl(data.fecha),
          'temperatura': new FormControl(data.temperatura),
          'pulso': new FormControl(data.pulso),
          'ritmoRespiratorio': new FormControl(data.ritmoRespiratorio)
        });
      });
    }
  }

}
