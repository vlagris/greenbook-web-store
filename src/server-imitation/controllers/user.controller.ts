import {db} from "@/server-imitation/db/indexedDB.ts";
import {errors} from "@/server-imitation/constants.ts";


export async function getUser(req: any) {
  const userId = req.userId;

  if (!userId) {
    return {
      status: 403,
      data: errors.NOT_AUTH
    }
  }

  const user = await db.get("users", userId);

  if (user.avatarImage) {
    user.avatarImage = URL.createObjectURL(user.avatarImage)
  }


  if (!user) {
    return {
      status: 400,
      data: errors.BAD_REQUEST
    }
  }


  return {
    status: 200,
    data: user
  }
}


export async function updateUser(req: any) {
  const userId = req.userId;
  const formData = req.body;
  const firstName = formData.get("firstName") || null;
  const lastName = formData.get("lastName") || null;
  const avatarDeleted = formData.get("avatar") === "deleted";
  const avatarImageFIle = formData.get("avatar");


  if (!userId) {
    return {
      status: 403,
      data: errors.NOT_AUTH
    }
  }


  const user = await db.get("users", userId);


  if (!user) {
    return {
      status: 400,
      data: errors.BAD_REQUEST
    }
  }


  user.firstName = firstName;
  user.lastName = lastName;

  if (avatarDeleted) {
    user.avatarImage = null;
  }

  if (avatarImageFIle) {
    user.avatarImage = avatarImageFIle
  }

  if (avatarDeleted) {
    user.avatarImage = null;
  }

  await db.put("users", user);

  if (user.avatarImage) {
    user.avatarImage = URL.createObjectURL(user.avatarImage)
  }

  return {
    status: 200,
    data: user
  }
}


export async function updateEmail(req: any) {
  const userId = req.userId;
  const { email } = req.body;

  if (!userId) {
    return {
      status: 403,
      data: errors.NOT_AUTH
    }
  }


  const isUseEmail = await db.getFromIndex("users", "email", email);


  if (isUseEmail) {
    return {
      status: 400,
      data: errors.BAD_REQUEST
    }
  }


  const user = await db.get("users", userId);


  if (!user) {
    return {
      status: 400,
      data: errors.BAD_REQUEST
    }
  }


  user.email = email;

  await db.put("users", user);

  if (user.avatarImage) {
    user.avatarImage = URL.createObjectURL(user.avatarImage)
  }

  return {
    status: 200,
    data: user
  }
}


export async function updatePassword(req: any) {
  const userId = req.userId;
  const { currentPassword, newPassword } = req.body;

  if (!userId) {
    return {
      status: 403,
      data: errors.NOT_AUTH
    }
  }

  const user = await db.get("users", userId);

  if (!user && currentPassword !== user.password) {
    return {
      status: 400,
      data: errors.BAD_REQUEST
    }
  }

  user.password = newPassword;

  await db.put("users", user);

    // const salt = await bcrypt.genSalt(11);
    // const passwordHash = await bcrypt.hash(newPassword, salt);

  return {
    status: 200,
    data: {
      success: true
    }
  }
}
