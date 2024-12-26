import { FileIcon as ReactFileIcon, defaultStyles } from 'react-file-icon';

export default function FileIcon({
  ext,
  className,
  ...props
}: { ext: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      <ReactFileIcon
        extension={ext}
        {...defaultStyles[ext as keyof typeof defaultStyles]}
      />
    </div>
  );
}
