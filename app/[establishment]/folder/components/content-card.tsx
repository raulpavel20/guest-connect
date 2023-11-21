import Image from "next/image";
export default function ContentCard({
  image,
  title,
  onClick,
  image_small,
}: {
  image: string;
  title: string;
  onClick?: () => void;
  image_small: string;
}) {
  return (
    <li
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center drop-shadow-md"
      onClick={onClick}
    >
      <div className="flex flex-1 flex-col p-2">
        <Image
          width={500}
          height={500}
          src={image}
          alt="content image"
          className="rounded-lg h-28 object-cover"
          placeholder="blur"
          blurDataURL={`data:image/jpeg;base64,${image_small}`}
        />
        <h1 className="text-md font-semibold leading-tight tracking-tight text-gray-900 pt-2">
          {title}
        </h1>
      </div>
    </li>
  );
}
