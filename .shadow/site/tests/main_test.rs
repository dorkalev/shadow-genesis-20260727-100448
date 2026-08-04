use std::process::Command;

#[test]
fn dashboard_cli_advertises_deterministic_report_import() {
    let output = Command::new(env!("CARGO_BIN_EXE_shadow"))
        .arg("not-a-command")
        .output()
        .expect("run shadow");
    assert!(!output.status.success());
    assert!(String::from_utf8_lossy(&output.stderr).contains("shadow import-verify"));
}
