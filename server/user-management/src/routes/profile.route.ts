import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ProfileController from '@/controllers/profile.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateProfileDto, EditProfileDto } from '@/dtos/profiles.dto';

class ProfileRoute implements Routes {
  public path = '/profile';
  public router = Router();
  private profileController = new ProfileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, authMiddleware, this.profileController.getUserProfiles);
    this.router.post(`${this.path}/`, validationMiddleware(CreateProfileDto, 'body'), authMiddleware, this.profileController.createProfile);
    this.router.patch(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(EditProfileDto, 'body', true),
      authMiddleware,
      this.profileController.editProfile,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.profileController.deleteProfile);
  }
}

export default ProfileRoute;
