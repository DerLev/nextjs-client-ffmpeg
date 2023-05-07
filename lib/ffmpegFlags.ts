import stripFileextension from './stripFileextension'

const mp4Group = [ 'mp4', 'm4v' ]
const mkvGroup = [ ...mp4Group, 'mov' ]
const oggGroup = [ 'flac', 'opus' ]
const m4aGroup = [ ...mp4Group, 'aac', 'm4a' ]

const additionalFlags = (file: string, filetype: string) => {
  const additionalFlags: string[] = []

  switch (filetype) {
    case 'aac':
      if(m4aGroup.find((filetype) => filetype === stripFileextension(file).fileextension)) {
        additionalFlags.push('-c')
        additionalFlags.push('copy')
      }
      break
    case 'ogg':
      additionalFlags.push('-vn')
      if(oggGroup.find((filetype) => filetype === stripFileextension(file).fileextension)) {
        additionalFlags.push('-c')
        additionalFlags.push('copy')
      }
      break
    case 'm4a':
      if(m4aGroup.find((filetype) => filetype === stripFileextension(file).fileextension)) {
        additionalFlags.push('-c')
        additionalFlags.push('copy')
      }
      break
    case 'm4v':
      if(mp4Group.find((filetype) => filetype === stripFileextension(file).fileextension)) {
        additionalFlags.push('-c')
        additionalFlags.push('copy')
      }
      break
    case 'mkv':
      if(mkvGroup.find((filetype) => filetype === stripFileextension(file).fileextension)) {
        additionalFlags.push('-c')
        additionalFlags.push('copy')
      }
      break
    case 'mp4':
      if(mp4Group.find((filetype) => filetype === stripFileextension(file).fileextension)) {
        additionalFlags.push('-c')
        additionalFlags.push('copy')
      }
      break
    default:
      break
  }

  return additionalFlags
}

export default additionalFlags
export { m4aGroup, mkvGroup, mp4Group, oggGroup }
