onmessage = async (e) => {
  // Retrieve message sent to work from main script
  const message = e.data
  console.log("Worker Message",message);

  // Get handle to draft file
  const root = await navigator.storage.getDirectory()
  const draftHandle = await root.getFileHandle("draft.txt", { create: true })
  console.log("Handle OK");

  // Get sync access handle
  const accessHandle = await draftHandle.createSyncAccessHandle()
  console.log("Handle Accessed !");

  // Get size of the file.
  const fileSize = accessHandle.getSize()
  // Read file content to a buffer.
  const buffer = new DataView(new ArrayBuffer(fileSize))
  const readBuffer = accessHandle.read(buffer, { at: 0 })
  console.log("Filesize", fileSize);

  // Write the message to the end of the file.
  const encoder = new TextEncoder()
  const encodedMessage = encoder.encode(message)
  const writeBuffer = accessHandle.write(encodedMessage, { at: readBuffer })
  console.log("Message Written")

  // Persist changes to disk.
  accessHandle.flush()
  console.log("Message Saved")

  // Always close FileSystemSyncAccessHandle if done.
  accessHandle.close()
  console.log("Handle Closed")
}
