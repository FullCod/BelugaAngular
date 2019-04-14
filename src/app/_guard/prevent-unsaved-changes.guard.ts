import { MemberComponent } from "./../member/member.component";
import { Injectable, Component } from "@angular/core";
import { CanDeactivate } from "@angular/router";

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberComponent> {
   canDeactivate(component: MemberComponent) {
    if (component.editForm.dirty) {
        return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
    }
    return true;
  }
}
