## Intro

In order to keep the Angel's data safe and create a P2P connection between the Mage and the Angel, we encrypt the data on the Angels' client before storing it on IPFS.


## The Challenge
since the file sizes start from 50MB up to a couple GigaBytes later, we will have issues reading these large files on the client and then encrypting them (AES) on the clients' browser.

##### Limitations
There are some limitations that we can not do anything about on the web, such as the memory allocation in the browser tab, or the maximum file size that we can read using FileReader API which is around a couple GB up to 3GB (tested on Chromium v92.0.4515.159) and then even after, when trying to upload it to IPFS there's a max limit up to a couple GB as well.
while respecting these limitation on the environment we are running on we are up to solve this challenge within the limits described above.

##### How can we fix it?
Javascript is synchronous, top to bottom programming language, however using some browser APIs we can run code outside of this context, the Event loop.
for our use case WebWorkers look like the perfect solution. so here's how I think about it:

1. user selects a file (`<input type='file'>`) ; `File`
2. we get the size of the files ; `SIZE`
3. if the size exceeds the browser limitation then abort the process
4. otherwise determine how many concurrent cores can we have access to using `navigator.hardwareConcurrency` ; `N`
5. create `N` inline workers
6. slice the `File` into 5MB chunks; `CHUNK_COUNT`
7. give the first `N` chunks to `N` workers and wait on the response
8. assign next chunk to the next available worker

each worker is responsible for reading the given chunk of file, then encrypting it with the generated secret key and IV, then return the encrypted buffer.
