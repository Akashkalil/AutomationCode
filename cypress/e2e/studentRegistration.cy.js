describe('Webcam Spec', () => {
  beforeEach(() => {
    cy.on('window:load', (win) => {
      const iframe = win.parent.document.querySelector('.aut-iframe'); // Adjust the selector as needed
      if (iframe) {
        iframe.setAttribute('allow', 'camera;microphone');
      }
    });
  });

  it('Submit New User FullFlow with Face Capture Simulation', () => {
    // Visit the registration page
    cy.visit('https://digival-staging-nginx-ds-yk25kmkzeq-el.a.run.app/staging1-dcweb/auth/register', {
      failOnStatusCode: false,
    });

    // // Define test data
    const email = "akashAs@mail.com";
    const email1 = "akashAs@gmail.com";
    const firstName = 'Akash';
    const enterOtp = "1234";
    const password = "12345678";
    const password1 = "123456";
    const confirmPassword = "12345678";
    const academicId = "A123456789";
    const mobileNumber = "6374142625";
    const gender = "male"; // or "female" based on your selection
    // cy.get("img").should("exist").and('be.visible');
    // Step 1: Enter email and submit
    cy.get('input[type="email"]').should("exist").type(email);
    cy.get('input[type="email"]').should("have.value", email);
    cy.wait(2000,{log:false});
    // Step 2: Submit the form
    cy.get("button.buttonfx").should("exist").should("not.be.disabled").click();
    cy.wait(2000,{log:false});
    // Step 3: Enter OTP and verify
    cy.get('[placeholder="Enter OTP"]').should("exist").type(enterOtp);
    cy.get('[placeholder="Enter OTP"]').should("have.value", enterOtp);
    cy.wait(2000,{log:false});
    cy.get("button.verify-button").should("exist").should("not.be.disabled").click();
  
    // Step 4: Enter password and confirm password
    cy.get('[placeholder="Enter Password"]').should("exist").type(password);
    cy.get('[placeholder="Enter Password"]').should("have.value", password);
    cy.wait(2000,{log:false});
    cy.get('[placeholder="Confirm Password"]').should("exist").type(confirmPassword);
    cy.get('[placeholder="Confirm Password"]').should("have.value", confirmPassword);
    cy.wait(2000,{log:false});
    // Step 5: Submit the form
    cy.get("button.verify-button").should("exist").should("not.be.disabled").click();
    cy.wait(2000,{log:false});
    // Step 6: Enter Name details
    cy.get('input[placeholder="First Name *"]').should("exist").type(firstName);
    cy.wait(1000,{log:false});
    cy.get('input[placeholder="Middle Name"]').should("exist").type("A");
    cy.wait(1000,{log:false});
    cy.get('input[placeholder="Last Name *"]').should("exist").type("H");
    cy.wait(1000,{log:false});

    // // // Step 7: Trigger the face capture
    // cy.contains("Face Authentication").should("exist");
    // cy.get('button').contains("Face Capture").should("exist").click();

    // // Wait for,{log:false} the video element to be visible
    // cy.get('video.oval-webcam').should('be.visible');
    // // Simulate starting the video stream
    // cy.get('video.oval-webcam').then((video) => {
    // });
    // cy.get("button").contains("save").should("exist").click();
    //   cy.window().then((win) => {
    //     // Assuming 'faceClear' and 'capturedImages' are in the window object
    //     // You can mock these values or update the React component state to simulate this behavior
    //     win.faceClear = true;  // Set faceClear to false
    //     win.capturedImages = ['TracklyBg.jpg']; // Set capturedImages with at least one item
    //   });
    //   // Now check if the image is visible
    //   cy.get('img').should('exist'); // Ensure the image exists in the DOM
    //   cy.wait(1000,{log:false}); // Wait for,{log:false} 1 second (adjust if needed)
      
    //   cy.get('img')
    //     .and(($img) => {
    //       // Get the img's src attribute
    //       const src = $img.attr('src');
  
    //       // You can verify the src contains your expected image source
    //       // This could be a base64 string or a URL depending on your case
    //       expect(src).to.include('TracklyBg.jpg'); // Modify as needed
  
    //       // Optionally, verify the image dimensions
    //       expect($img).to.have.attr('height', '150px');
    //       expect($img).to.have.css('width', '13em'); // Check if the uploaded file is correct
    //   })

    // Step 8: Enter Academic ID
    cy.get('input[placeholder="Academic ID *"]').should("exist").type(academicId);
    cy.get('input[placeholder="Academic ID *"]').should("have.value", academicId);
    cy.wait(1000,{log:false});
    // Step 9: Enter Mobile Number
    cy.get('input[placeholder="Mobile Number *"]').should("exist").type(mobileNumber);
    cy.get('input[placeholder="Mobile Number *"]').should("have.value", mobileNumber);
    cy.wait(1000,{log:false});
    // Step 10: Select Gender
    cy.get(`input[value="${gender}"]`).check().should('be.checked'); // Adjust based on the selected gender
    cy.get('input[value="female"]').should('not.be.checked');
    cy.wait(1000,{log:false});
    // Step 11: Upload ID card document
    cy.contains("Upload your ID card").should("exist");
    cy.wait(3000,{log:false});
    // Click the Upload file button
    cy.contains('Upload file').should('be.visible').click();
    cy.get('input[type="file"]').attachFile('TracklyBg.jpg').then(() => {
      cy.get('input[type="file"]').then((input) => {
        const fileName = input[0].files[0].name; // Access the file name
        expect(fileName).to.equal('TracklyBg.jpg'); // Check if the uploaded file is correct
      });
    });

    cy.wait(300,{log:false});
    // cy.contains('Submit').should('be.visible').click({ force: true });
    cy.visit('https://digival-staging-nginx-ds-yk25kmkzeq-el.a.run.app/staging1-dsweb/login', {
      failOnStatusCode: false,
    });
    cy.wait(1000,{log:false});
    cy.get('input[type="text"]').should("exist").type('digiproductsadmin@digi.com');
    cy.get('input[type="text"]').should("have.value", 'digiproductsadmin@digi.com');
     cy.get('input[type="password"]').should("exist").type('12345678');
    cy.get('input[type="password"]').should("have.value", '12345678');
    cy.get("button").contains("login").should("exist").click();
    cy.wait(8000,{log:false});
    cy.get(':nth-child(5) > :nth-child(1) > [style="position: relative;"] > [style="height: 60px; width: 252px; position: absolute; left: -12px; border-radius: 10px; overflow: hidden; background-color: rgb(255, 255, 255);"] > .px-2').click();
    cy.get('.justify-content-start').click();
    cy.wait(1000,{log:false});
    cy.get('.sidenav > :nth-child(7)').click();
    cy.wait(1000,{log:false});
    cy.get('[href="/staging1-dsweb/student/management"]').click();
    cy.wait(1000,{log:false});
    cy.get('#menu > :nth-child(4)').click({force: true}); // Click the link
    cy.get(':nth-child(7) > .MuiButtonBase-root').click();
    cy.wait(1000,{log:false});
    cy.get("button").contains("Edit").should("exist").click();
    cy.wait(2000,{log:false});
    cy.get("button").contains("CLOSE").should("exist").click();
    cy.get("button").contains("Accept").should("exist").click();
    cy.wait(3000,{log:false});
    cy.visit('https://digival-staging-nginx-ds-yk25kmkzeq-el.a.run.app/staging1-dcweb/auth/login', {
      failOnStatusCode: false,
    });
    cy.get('input[type="input"]').should("exist").type(email1);
    cy.get('input[type="input"]').should("have.value", email1);
    cy.wait(2000,{log:false});
    cy.get('input[type="password"]').should("exist").type(password1);
    cy.get('input[type="password"]').should("have.value", password1);
    cy.wait(2000,{log:false});
    cy.get("button").contains("LOGIN").should("exist").click();
  });
});
