import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordDTO } from 'src/app/models/change-password-dto';
import { EmailPasswordService } from 'src/app/service/email-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  newPassword!: string;
  confirmPassword!: string;
  tokenPassword!: string;

  dto!: ChangePasswordDTO;

  passPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]*).{6,20}$";

  msgSuccess!: string;

  msgFail!: string;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onChangePassword(): void {
    this.tokenPassword = this.activatedRoute.snapshot.params['tokenPassword'];
    this.dto = new ChangePasswordDTO(this.newPassword, this.confirmPassword, this.tokenPassword);
    this.emailPasswordService.changePassword(this.dto).subscribe({
      next: data => {
        this.msgSuccess = data.mensaje;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      },
      error: err => {
        this.msgFail = err.error.mensaje;
      }
    });
  }

}
