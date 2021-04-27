import { Component, HostBinding, TemplateRef, ViewChild } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from './theme/services/theme.service';
import { Theme, ThemeMode } from './theme/models/theme.model';
import { ConnectionService } from './utils/global/connection/connection.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('offlineSnackBarTempl') offlineSnackBarTempl: TemplateRef<any>;
  title = 'Base-Project';
  themeMode = ThemeMode;
  themeSelected: Theme;
  themes: Theme[] = [
    new Theme({
      primary: '#ce9b30',
      secondary: '#007bc9',
      success: '#17a938',
      info: '#3b99ff',
      warning: '#ffbf00',
      danger: '#ef4444',
    }),
    new Theme({
      primary: '#3367d6',
      secondary: '#4bbb00',
      success: '#17a938',
      info: '#3b99ff',
      warning: '#ffbf00',
      danger: '#ef4444',
    }),
    new Theme({
      primary: '#9828d4',
      secondary: '#edca8e',
      success: '#17a938',
      info: '#3b99ff',
      warning: '#ffbf00',
      danger: '#ef4444',
    }),
    new Theme({
      primary: '#3FB5AB',
      secondary: '#B53FA2',
      success: '#17a938',
      info: '#3b99ff',
      warning: '#ffbf00',
      danger: '#ef4444',
    }),
  ];

  @HostBinding('class') componentClass: ThemeMode;
  constructor(
    private overlayContainer: OverlayContainer,
    public _themeService: ThemeService,
    private _connectionService: ConnectionService,
    private _snackBar: MatSnackBar
  ) {
    this.themeSelected = this._themeService.getcurrentTheme();
    this.componentClass = this.themeSelected.getCurrentModeName;
    this.overlayContainer
      .getContainerElement()
      .classList.add(this.themeSelected.getCurrentModeName);
    this._connectionService.changeOnlineStatus().subscribe((online) => {
      if (!online) {
        this._snackBar.open('Sin conexión a internet', null, {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      } else {
        this._snackBar.dismiss();
      }
    });
  }

  ngOnInit(): void {}

  public changeTheme(theme: Theme) {
    this.themeSelected = theme;
    this._themeService.toggleTheme(theme);
  }

  public changeThemeMode(className: ThemeMode) {
    this.overlayContainer
      .getContainerElement()
      .classList.remove(this.componentClass);
    this.overlayContainer.getContainerElement().classList.add(className);
    this.componentClass = className;
    this._themeService.toggleThemeMode(className);
  }
}
