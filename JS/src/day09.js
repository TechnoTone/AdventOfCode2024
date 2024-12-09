module.exports.part1 = (input) => {
  const parsedA = parse1(input);
  const defragmented = defragment1(parsedA);
  return checksum1(defragmented.blocks);
};

module.exports.part2 = (input) => {
  const parsed = parse2(input);
  const defragmented = defragment2(parsed);
  return checksum2(defragmented.files);
};

parse1 = (input) => {
  const blocks = [];
  const spaces = [];

  input.forEach((value, index) => {
    if (index % 2 === 0) {
      const fileId = index / 2;
      blocks.push(...Array(value).fill(fileId));
    } else {
      while (value > 0) {
        spaces.push(blocks.length);
        blocks.push(null);
        value--;
      }
    }
  });

  return { blocks, spaces };
};

defragment1 = ({ blocks, spaces }) => {
  let blockIndex = blocks.length - 1;
  while (spaces.length) {
    const nextSpace = spaces.shift();
    while (blocks[blockIndex] === null) {
      blockIndex--;
    }
    if (blockIndex <= nextSpace) {
      break;
    }
    blocks[nextSpace] = blocks[blockIndex];
    blocks[blockIndex] = null;
  }
  return { blocks, spaces };
};

checksum1 = (blocks) => {
  const log = [];
  const result = blocks.reduce((acc, block, index) => {
    log.push([index, block]);
    return acc + block * index;
  }, 0);
  return result;
};

parse2 = (input) => {
  const files = [];
  const spaces = [];

  let offset = 0;

  input.forEach((value, index) => {
    if (index % 2 === 0) {
      if (value > 0) {
        files.push({ offset: offset, size: value });
        offset += value;
      }
    } else {
      if (value > 0) {
        spaces.push({ offset: offset, size: value });
        offset += value;
      }
    }
  });

  return { files, spaces };
};

defragment2 = ({ files, spaces }) => {
  for (let fileId = files.length - 1; fileId >= 0; fileId--) {
    const file = files[fileId];
    let spaceId = 0;
    while (spaceId < spaces.length && spaces[spaceId].offset < file.offset) {
      if (file.size <= spaces[spaceId].size) {
        // move file
        const fileOffset = file.offset;
        const fileSize = file.size;
        file.offset = spaces[spaceId].offset;
        if (fileSize < spaces[spaceId].size) {
          spaces[spaceId].offset += fileSize;
          spaces[spaceId].size -= fileSize;
        } else {
          spaces.splice(spaceId, 1);
        }
        insertSpace(spaces, fileOffset, fileSize);
        break;
      }
      spaceId++;
    }
  }
  return { files, spaces };
};

insertSpace = (spaces, offset, size) => {
  let spaceId = 0;
  while (spaceId < spaces.length && spaces[spaceId].offset < offset) {
    spaceId++;
  }
  if (spaceId >= spaces.length) {
    // new space is at the end
    const previousSpace = spaces[spaces.length - 1];
    if (previousSpace.offset + previousSpace.size === offset) {
      // extend last space
      previousSpace.size += size;
    } else {
      // add new space
      spaces.push({ offset, size });
    }
  } else {
    // new space is in the middle
    const previousSpace = spaces[spaceId - 1];
    if (previousSpace && previousSpace.offset + previousSpace.size === offset) {
      // previous space touches new space so extend previous space
      previousSpace.size += size;
      if (spaceId < spaces.length && offset + size === spaces[spaceId].offset) {
        // new space touches next space so merge with next space
        previousSpace.size += spaces[spaceId].size;
        spaces.splice(spaceId, 1);
      }
    } else if (offset + size === spaces[spaceId].offset) {
      // new space touches next space so extend next space
      spaces[spaceId].offset = offset;
      spaces[spaceId].size += size;
    } else {
      // new space doesn't touch any other space so insert
      spaces.splice(spaceId, 0, { offset, size });
    }
  }
};

checksum2 = (files) => {
  return files.reduce((acc, file, fileId) => {
    let offset = file.offset;
    let size = file.size;

    while (size > 0) {
      acc += fileId * offset;
      offset++;
      size--;
    }
    return acc;
  }, 0);
};
