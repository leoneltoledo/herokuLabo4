import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  public formGroup: FormGroup;
  public survey: any;
  constructor(private fb: FormBuilder, private dbService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'telefono': ['', [Validators.required, Validators.min(1111111111), Validators.max(9999999999)]],
      'ppt': ['',],
      'memotest': ['',],
      'tateti': ['',],
      'batalla': ['',],
      'feedback': ['',],
      'mejoras': ['',],
    });
  }

  public aceptar(): void{
    this.survey = this.formGroup.getRawValue();
    this.survey.usuario = JSON.parse(localStorage.getItem('user')).user.email;
    this.dbService.saveSurvey(this.survey);

    Swal.fire({
      title: 'Muchas gracias!',
      text: 'La encuesta ha sido enviada y será revisada.',
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      confirmButtonColor: '#311B92'   
    }).then(() => {
      this.router.navigateByUrl('');
    }); 
  }


}
