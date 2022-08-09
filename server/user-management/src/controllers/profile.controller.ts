import { CreateProfileDto, EditProfileDto } from '@/dtos/profiles.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import ProfileService from '@/services/profile.service';
import UserService from '@/services/users.service';
import { NextFunction, Response } from 'express';

class ProfileController {
  private profileService = new ProfileService();
  private userService = new UserService();

  public getUserProfiles = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const getUserProfileData = await this.profileService.findUserProfiles(userId);

      res.status(200).json({ data: getUserProfileData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public createProfile = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const profileData: CreateProfileDto = req.body;

      const createProfileData = await this.profileService.createProfile(req.user.id, profileData);

      res.status(201).json({ data: createProfileData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public editProfile = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const profileId = Number(req.params.id);
      const profileData: EditProfileDto = req.body;

      // TODO: Check if the profile belongs to the user or not
      // const loggedInUser = await this.userService.findUserById(req.user.id, { profile: true });

      const editProfileData = await this.profileService.editProfile(profileId, profileData);

      res.status(200).json({ data: editProfileData, message: 'edited' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProfile = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const profileId = Number(req.params.id);
      // TODO: Check if the profile belongs to the user or not
      // const loggedInUser = await this.userService.findUserById(req.user.id, { profile: true });

      const deleteProfileData = await this.profileService.deleteProfile(profileId);

      res.status(200).json({ data: deleteProfileData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProfileController;
