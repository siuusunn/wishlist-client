// Import the Cloudinary class.
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';

import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';

// Create a Cloudinary instance and set your cloud name.
export default function ProfilePicture({
  cloudinaryImageId,
  imageWidth,
  imageHeight,
  radius,
  backgroundColor
}) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
    }
  });

  // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
  const myImage = cld.image(cloudinaryImageId);

  // myImage.resize(
  //   thumbnail()
  //     .width(imageWidth)
  //     .height(imageHeight)
  //     .gravity(focusOn(FocusOn.face()))
  // );

  myImage
    .resize(
      thumbnail()
        .width(imageWidth)
        .height(imageHeight)
        .gravity(focusOn(FocusOn.face()))
    ) // Crop the image, focusing on the face.
    .roundCorners(byRadius(radius))
    .backgroundColor(backgroundColor); // Round the corners.

  return <AdvancedImage cldImg={myImage} />;
}
