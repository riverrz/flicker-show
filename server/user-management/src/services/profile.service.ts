import { PrismaClient, Profile } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateProfileDto, EditProfileDto } from '@dtos/profiles.dto';

class ProfileService {
  public profiles = new PrismaClient().profile;

  public async findUserProfiles(userId: number): Promise<Profile[]> {
    const profiles = await this.profiles.findMany({ where: { userId } });

    return profiles;
  }

  public async createProfile(userId: number, profileData: CreateProfileDto): Promise<Profile> {
    if (isEmpty(profileData)) throw new HttpException(400, 'profileData is empty');
    const createProfileData = await this.profiles.create({
      data: {
        ...profileData,
        userId,
      },
    });

    return createProfileData;
  }

  public async editProfile(profileId: number, profileData: EditProfileDto): Promise<Profile> {
    if (isEmpty(profileData)) throw new HttpException(400, 'profileData is empty');

    const findProfile: Profile = await this.profiles.findUnique({ where: { id: profileId } });
    if (!findProfile) throw new HttpException(409, `Profile doesn't exist`);

    const editProfileData = await this.profiles.update({ where: { id: profileId }, data: profileData });

    return editProfileData;
  }

  public async deleteProfile(profileId: number): Promise<Profile> {
    const deleteProfileData = await this.profiles.delete({ where: { id: profileId } });

    return deleteProfileData;
  }
}

export default ProfileService;
