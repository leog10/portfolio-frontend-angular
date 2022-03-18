import { Component, OnInit } from '@angular/core';
import { EmailValuesDTO } from 'src/app/models/email-values-dto';
import { EmailPasswordService } from 'src/app/service/email-password.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

  mailTo!: string;

  dto!: EmailValuesDTO;

  msgSuccess!: string;

  msgFail!: string;

  msgAwait!: string;

  goBack() {    
    window.history.back();    
  }

  constructor(
    private emailPasswordService: EmailPasswordService
  ) { }

  ngOnInit(): void {
  }

  onSendEmail(): void {
    this.msgFail = '';
    this.dto = new EmailValuesDTO(this.mailTo);
    this.emailPasswordService.sendEmail(this.dto).subscribe({
      next: data => {
        this.msgAwait = '';
        this.msgSuccess = data.mensaje;
      },
      error: err => {
        this.msgAwait = '';
        this.msgFail = err.error.mensaje;
      }
    });
  }

}
